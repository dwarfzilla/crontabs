import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { Tab } from '../types';
import type { RootState } from '../store/index'

export type TabSansId = Omit<Tab, "id">;

export type TabsStateType = { 
  [index: string]: Tab
};

const initialState: TabsStateType = {};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setTabs: (state, action: PayloadAction<TabsStateType>) => {
        return action.payload;
    },
    addTab: (state, action: PayloadAction<TabSansId>) => {
      const { payload: tab } = action;
      const id = uuid.v4();
      state[id] = {
          id,
          ...tab
      };
    },
    removeTab: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    }
  }
})

export const { setTabs, addTab, removeTab } = tabsSlice.actions;
export const selectTabs = (state: RootState) => Object.values(state.tabs);
export const selectAdvancedTabs = (state: RootState) => selectTabs(state).filter(tab => !tab.timeManagement);
export const selectTimeManagementTabs = (state: RootState) => selectTabs(state).filter(tab => tab.timeManagement);

export default tabsSlice.reducer;
