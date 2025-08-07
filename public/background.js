// Import the later.js library.
importScripts('later.min.js');

// Use local time for scheduling.
later.date.localTime();

// Listener for when the extension is first installed or updated.
chrome.runtime.onInstalled.addListener(() => {
  console.log("Crontabs extension installed.");
  // On installation, read all schedules from storage and create alarms.
  rescheduleAlarms();
});

// Listener for when the browser starts up.
chrome.runtime.onStartup.addListener(() => {
  console.log("Browser started up.");
  rescheduleAlarms();
});

// Listener for changes in chrome.storage.
chrome.storage.onChanged.addListener((changes, namespace) => {
  // If the schedules or tabs have changed, recreate the alarms.
  if (changes.schedules || changes.tabs) {
    console.log("Schedules or tabs have changed, recreating alarms.");
    rescheduleAlarms();
  }
});

// Listener for alarm events.
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("Alarm fired:", alarm.name);
  // When an alarm fires, perform the scheduled action.
  executeSchedule(alarm.name);
  // Reschedule the next occurrence of this alarm.
  scheduleNext(alarm.name);
});

// Function to clear and create alarms for all schedules.
function rescheduleAlarms() {
  // Clear all existing alarms first.
  chrome.alarms.clearAll(() => {
    console.log("Cleared all alarms.");
    // Get all schedules from storage.
    chrome.storage.local.get(["schedules"], (result) => {
      const { schedules } = result;
      if (schedules) {
        // Create an alarm for each schedule.
        Object.values(schedules).forEach((schedule) => {
          scheduleNext(schedule.id);
        });
      }
    });
  });
}

// Function to schedule the next occurrence of a single schedule.
function scheduleNext(scheduleId) {
    chrome.storage.local.get(["schedules"], (result) => {
        const { schedules } = result;
        if (!schedules || !schedules[scheduleId]) {
            return;
        }
        const schedule = schedules[scheduleId];
        const expression = schedule.expression;
        if (!expression) {
            return;
        }

        let parsed;
        if (schedule.type === 'cron') {
            // Add seconds to cron expression if not present.
            const parts = expression.split(' ');
            if (parts.length === 5) {
                parts.unshift('0');
            }
            parsed = later.parse.cron(parts.join(' '), true);
        } else {
            parsed = later.parse.text(expression);
        }

        if (parsed.error !== -1) {
            console.error("Error parsing schedule expression:", expression, parsed.error);
            return;
        }

        const nextOccurrence = later.schedule(parsed).next(1);
        if (nextOccurrence) {
            // Create the alarm.
            chrome.alarms.create(schedule.id, {
                when: nextOccurrence.getTime(),
            });
            console.log(`Scheduled '${schedule.id}' for ${nextOccurrence}`);
        } else {
            console.log(`No future occurrences for schedule '${schedule.id}'`);
        }
    });
}


// Function to execute a schedule.
function executeSchedule(scheduleId) {
  chrome.storage.local.get(["schedules", "tabs"], (result) => {
    const { schedules, tabs } = result;
    if (schedules && tabs && schedules[scheduleId]) {
      const schedule = schedules[scheduleId];
      const tab = tabs[schedule.tabId];
      if (tab) {
        console.log(`Executing schedule '${schedule.id}': ${schedule.operation} ${tab.url}`);
        switch (schedule.operation) {
          case "open":
            chrome.tabs.create({ url: tab.url, active: false });
            break;
          case "show":
             chrome.tabs.create({ url: tab.url, active: true });
            break;
          case "showAndReload":
            chrome.tabs.query({ url: tab.url }, (foundTabs) => {
                if (foundTabs.length > 0) {
                    chrome.tabs.reload(foundTabs[0].id);
                    chrome.tabs.update(foundTabs[0].id, { active: true });
                } else {
                    chrome.tabs.create({ url: tab.url, active: true });
                }
            });
            break;
          case "reload":
            chrome.tabs.query({ url: tab.url }, (foundTabs) => {
              foundTabs.forEach((foundTab) => {
                chrome.tabs.reload(foundTab.id);
              });
            });
            break;
          case "close":
            chrome.tabs.query({ url: tab.url }, (foundTabs) => {
              foundTabs.forEach((foundTab) => {
                chrome.tabs.remove(foundTab.id);
              });
            });
            break;
        }
      } else {
          console.error(`Tab with id ${schedule.tabId} not found for schedule ${schedule.id}`);
      }
    } else {
        console.error(`Schedule with id ${scheduleId} not found`);
    }
  });
}
