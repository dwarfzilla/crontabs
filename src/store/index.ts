import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./tabsSlice";
import schedulesReducer from "./scheduleSlice";

const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    schedules: schedulesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;