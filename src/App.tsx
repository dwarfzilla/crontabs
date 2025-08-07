import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TimeManagementPage from './pages/time-management/TimeManagementPage';
import AdvancedPage from './pages/advanced/AdvancedPage';
import Nav from './components/nav/Nav';
import Box from '@mui/material/Box';

function App() {
  return (
    <Box>
      <Nav />
      <Routes>
        <Route path="/advanced" element={<AdvancedPage />} />
        <Route path="/" element={<TimeManagementPage />} />
      </Routes>
    </Box>
  );
}

export default App;
