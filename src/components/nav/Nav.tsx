import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Status from './Status';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function a11yProps(name: string) {
  return {
    'aria-label': `crontabs-tab-${name}`,
    'aria-controls': `crontabs-tabpanel-${name}`,
  };
}

const Nav = () => {
  const location = useLocation();
  return (
    <AppBar position="static">
      <Container fixed>
        <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
          <Typography variant="h6" noWrap>
            Crontabs
          </Typography>
          <Box sx={{ flexGrow: 1, marginLeft: 3 }}>
            <Tabs
              value={location.pathname}
              aria-label="Crontabs tabs"
              textColor="inherit"
            >
              <Tab
                label="Time Management"
                component={Link}
                value="/"
                to={'/'}
                {...a11yProps('Time Management')}
              />
              <Tab
                label="Advanced"
                component={Link}
                value="/advanced"
                to={'/advanced'}
                {...a1yProps('Advanced')}
              />
            </Tabs>
          </Box>
          <Status />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
