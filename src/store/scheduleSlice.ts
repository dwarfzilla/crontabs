import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { RootState } from '.';
import { getLaterScheduleForExpression } from '../helpers/laterHelper';
import { scheduleIsOpenOperation } from '../helpers/timeManagementTabCompatibilityHelper';
import { Schedule, ScheduleType } from '../types';

export type AddSchedulePayload = {
  tabId: string,
  type: ScheduleType
};

export type SchedulesStateType = { 
  [index: string]: Schedule
};

export type UpdateSchedulePayloadType = {
  scheduleId: string,
  schedule: Partial<Schedule>
}

const initialState: SchedulesStateType = {};

export const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    setSchedules: (state, action: PayloadAction<SchedulesStateType>) => {
        return action.payload;
    },
    addSchedule: (state, action: PayloadAction<AddSchedulePayload>) => {
      const id = uuid.v4();
      state[id] = {
        id,
        type: action.payload.type,
        operation: "open",
        tabId: action.payload.tabId,
        expression: "",
      };
    },
    removeSchedule: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    updateSchedule: (state, action: PayloadAction<UpdateSchedulePayloadType>) => {
      const { scheduleId, schedule } = action.payload;
      if (state[scheduleId]) {
        state[scheduleId] = { ...state[scheduleId], ...schedule };
      }
    }
  }
})

interface ParsedSchedule {
  time: string;
  days: number[];
}

function parseSchedule(schedule: Schedule): ParsedSchedule | null {
    if (!schedule || !schedule.expression) {
        return null;
    }

    const laterSchedule = getLaterScheduleForExpression(schedule);
    if (!laterSchedule || !laterSchedule.schedules || laterSchedule.schedules.length === 0) {
        return null;
    }

    const s = laterSchedule.schedules[0];
    const hour = s.h?.[0];
    const minute = s.m?.[0];

    if (hour === undefined || minute === undefined) {
        return null;
    }

    const time = [
        hour < 10 ? '0' + hour : hour,
        minute < 10 ? '0' + minute : minute
    ].join(':');

    const days = s.d || [];

    return { time, days };
}


interface AdvancedSchedule {
  isOpen: boolean;
  time: string;
  days: number[]
}

export const { setSchedules, addSchedule, removeSchedule, updateSchedule } = scheduleSlice.actions;
export const selectSchedulesByTabId = (tabId: string) => (state: RootState): Schedule[] => Object.values(state.schedules).filter(schedule => schedule.tabId === tabId);
export const selectAdvancedSchedulesByTabId = (tabId: string) => (state: RootState): AdvancedSchedule[] =>
    selectSchedulesByTabId(tabId)(state).map((schedule) => {
        const parsed = parseSchedule(schedule);
        return {
            isOpen: scheduleIsOpenOperation(schedule),
            time: parsed?.time || '',
            days: parsed?.days || []
        }
    });

export default scheduleSlice.reducer;
