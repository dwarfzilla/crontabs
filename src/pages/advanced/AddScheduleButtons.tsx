import React from 'react';
import Box from '@mui/material/Box';
import { ScheduleType, Tab } from '../../types';
import Button from '@mui/material/Button';
import { addSchedule } from '../../store/scheduleSlice';
import { useDispatch } from 'react-redux';

type PropsType = {
  tab: Tab;
};

const AddScheduleButtons = ({ tab }: PropsType) => {
  const dispatch = useDispatch();
  function addNewSchedule(type: ScheduleType) {
    return () =>
      dispatch(
        addSchedule({
          tabId: tab.id,
          type,
        }),
      );
  }

  return (
    <Box>
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={addNewSchedule('cron')}
      >
        Add cron expression
      </Button>
      <Button
        sx={{ marginRight: 1 }}
        variant="outlined"
        onClick={addNewSchedule('text')}
      >
        Add text expression
      </Button>
    </Box>
  );
};

export default AddScheduleButtons;
