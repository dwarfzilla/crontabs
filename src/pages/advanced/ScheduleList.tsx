import React from 'react';
import Box from '@mui/material/Box';
import { Schedule } from '../../types';
import ScheduleForm from './ScheduleForm';

type PropsType = {
  schedules: Schedule[];
};

const ScheduleList = ({ schedules }: PropsType) => {
  return (
    <Box sx={{ marginTop: 1 }}>
      {schedules.map((schedule) => (
        <Box
          sx={{ marginTop: 1, marginBottom: 1 }}
          key={`schedule-${schedule.id}`}
        >
          <ScheduleForm schedule={schedule} />
        </Box>
      ))}
    </Box>
  );
};

export default ScheduleList;
