import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

const Status = () => {
  const [enabled, setEnabled] = useLocalStorage(
    'crontabsEnabled',
    false,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnabled(event.target.checked);
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={handleChange}
            name="crontabsEnabled"
          />
        }
        label={enabled ? 'Enabled' : 'Disabled'}
      />
    </Box>
  );
};

export default Status;
