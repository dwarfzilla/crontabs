import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectAdvancedSchedulesByTabId } from '../../store/scheduleSlice';
import { Tab } from '../../types';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import RemoveTabButton from '../../components/form/RemoveTabButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { DaysOfWeek } from '../../helpers/daysOfWeek';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type PropsType = {
  tab: Tab;
};

const TimeManagementTabForm = ({ tab }: PropsType) => {
  const schedules = useAppSelector(
    selectAdvancedSchedulesByTabId(tab.id),
  );
  const showSchedule = schedules.find((s) => s.isOpen);
  const closeSchedule = schedules.find((s) => !s.isOpen);
  if (!showSchedule) {
    return (
        <Box mt={4}>
            <Typography color="error" align="center">
                Error: Could not find a valid "open" schedule for this tab. Please delete it and create a new one.
            </Typography>
        </Box>
    );
  }

  return (
    <Box mt={4}>
        <Grid container>
            <Grid item sm={12}>
                <CrontabsFormControl>
                <TextField
                    fullWidth
                    required
                    label="Tab URL"
                    defaultValue={tab.url}
                />
                </CrontabsFormControl>
                <Box mt={1} mb={1}>
                    <Grid
                        container
                        justifyContent="space-between"
                        spacing={2}
                    >
                        <Grid item xs={6}>
                            <CrontabsFormControl>
                            <TextField
                                fullWidth
                                required
                                label="Open at"
                                type="time"
                                defaultValue={showSchedule.time}
                            />
                            </CrontabsFormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <CrontabsFormControl>
                            <TextField
                                fullWidth
                                label="Close at"
                                type="time"
                                defaultValue={closeSchedule?.time || ''}
                            />
                            </CrontabsFormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Grid container justifyContent="space-between">
                <FormGroup row>
                    {DaysOfWeek.map((day) => (
                    <FormControlLabel
                        key={day.id}
                        control={
                        <Checkbox
                            checked={showSchedule.days.indexOf(day.num) > -1}
                            name={day.id}
                        />
                        }
                        label={day.name}
                    />
                    ))}
                </FormGroup>
                </Grid>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <RemoveTabButton tab={tab} />
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
};

export default TimeManagementTabForm;
