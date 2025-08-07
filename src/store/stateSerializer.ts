import { RootState } from "./index";
import { StoredState, StoredTab, StoredSchedule } from "../types";

export function serializeState(state: RootState): StoredState {
    const { tabs, schedules } = state;
    const storedState: StoredState = Object.values(tabs).map((tab) => {
        const tabSchedules: StoredSchedule[] = Object.values(schedules)
            .filter((schedule) => schedule.tabId === tab.id)
            .map((schedule) => {
                // The schedule in the store has a tabId, but the stored schedule doesn't.
                const { tabId, ...rest } = schedule;
                return rest;
            });

        const storedTab: StoredTab = {
            id: tab.id,
            url: tab.url,
            timeManagement: tab.timeManagement,
            schedules: tabSchedules,
        };
        return storedTab;
    });
    return storedState;
}
