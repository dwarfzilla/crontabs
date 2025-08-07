import React from 'react';
import Box from '@mui/material/Box';
import { Tab } from '../../types';
import TimeManagementTabForm from './TimeManagementTabForm';
import Typography from '@mui/material/Typography';

type PropsType = {
  tabs: Tab[];
};

const TimeManagementTabList = ({ tabs }: PropsType) => {
  if (!tabs.length) {
    return (
      <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mt: 4 }}>
        Click the Add new tab button below to get started.
      </Typography>
    );
  }

  return (
    <>
      {tabs.map((tab) => (
        <Box key={`time-management-tab-${tab.id}`}>
          <TimeManagementTabForm tab={tab} />
        </Box>
      ))}
    </>
  );
};

export default TimeManagementTabList;
