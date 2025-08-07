import { StoredState } from "../types";

const CRONTABS_KEY = "crontabs";

export async function restoreTabs(): Promise<StoredState> {
  try {
    return new Promise((resolve) => {
        if (chrome && chrome.storage) {
            chrome.storage.local.get(CRONTABS_KEY, (result) => {
                if (result[CRONTABS_KEY]) {
                    resolve(JSON.parse(result[CRONTABS_KEY]));
                } else {
                    resolve([]);
                }
            });
        } else {
            // Fallback to localStorage for development outside the extension
            const tabs = localStorage.getItem(CRONTABS_KEY);
            if (tabs) {
                resolve(JSON.parse(tabs));
            } else {
                resolve([]);
            }
        }
    });
  } catch (e) {
    console.error("An error occurred when parsing local storage tabs", e);
    return [];
  }
}

export async function saveTabs(state: StoredState): Promise<void> {
  try {
    const dataToSave = JSON.stringify(state);
    if (chrome && chrome.storage) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [CRONTABS_KEY]: dataToSave }, () => {
                resolve();
            });
        });
    } else {
        // Fallback to localStorage for development outside the extension
        localStorage.setItem(CRONTABS_KEY, dataToSave);
    }
  } catch (e) {
    console.error("An error occurred when saving tabs to local storage", e);
  }
}