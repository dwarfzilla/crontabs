import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectSchedulesByTabId } from '../../store/scheduleSlice';
import { Tab } from '../../types';
import ScheduleList from './ScheduleList';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import AddScheduleButtons from './AddScheduleButtons';
import RemoveTabButton from '../../components/form/RemoveTabButton';
import Box from '@mui/material/Box';

type PropsType = {
  tab: Tab;
};

const TabForm = ({ tab }: PropsType) => {
  const schedules = useAppSelector(selectSchedulesByTabId(tab.id));
  return (
    <Box sx={{ marginTop: 4 }}>
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
                <ScheduleList schedules={schedules} />
                <Grid container justifyContent="space-between">
                <Grid item>
                    <AddScheduleButtons tab={tab} />
                </Grid>
                <Grid item>
                    <RemoveTabButton tab={tab} />
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>
  );
};

export default TabForm;
