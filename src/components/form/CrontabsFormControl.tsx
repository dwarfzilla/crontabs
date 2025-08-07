import React from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

const CrontabsFormControl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            {children}
        </FormControl>
    </Box>
  );
};

export default CrontabsFormControl;
