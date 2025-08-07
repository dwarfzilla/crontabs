import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import { Schedule } from '../../types';
import RemoveScheduleButton from './RemoveScheduleButton';
import ScheduleOperationSelect from './ScheduleOperationSelect';
import { useDispatch } from 'react-redux';
import { updateSchedule } from '../../store/scheduleSlice';

type PropsType = {
  schedule: Schedule;
};

const ScheduleForm = ({ schedule }: PropsType) => {
  const dispatch = useDispatch();

  function updateScheduleExpression(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    dispatch(
      updateSchedule({
        scheduleId: schedule.id,
        schedule: {
          expression: event.target?.value?.trim(),
        },
      }),
    );
  }

  return (
    <Grid container>
      <Grid item xs={8} sx={{ paddingRight: 1 }}>
        <CrontabsFormControl>
          <TextField
            fullWidth
            required
            label={`${
              schedule.type === 'cron' ? 'Cron' : 'Text'
            } Expression`}
            onChange={updateScheduleExpression}
            value={schedule.expression}
          />
        </CrontabsFormControl>
      </Grid>
      <Grid item xs={3}>
        <ScheduleOperationSelect schedule={schedule} />
      </Grid>
      <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
        <RemoveScheduleButton schedule={schedule} />
      </Grid>
    </Grid>
  );
};

export default ScheduleForm;
