import { AppDispatch } from ".";
import { restoreTabs } from "./localStorage";
import { setTabs } from "./tabsSlice";
import { setSchedules } from "./scheduleSlice";
import initialState from "./initialState";

export const loadState = () => async (dispatch: AppDispatch) => {
    const storedState = await restoreTabs();
    const { tabs, schedules } = initialState(storedState);
    dispatch(setTabs(tabs));
    dispatch(setSchedules(schedules));
};
