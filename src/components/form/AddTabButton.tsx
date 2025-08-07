import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { addTab, TabSansId } from '../../store/tabsSlice';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

const initialTab: TabSansId = {
  url: '',
  timeManagement: false,
};

const AddTabButton = () => {
  const dispatch = useDispatch();
  return (
    <Box mt={4} mb={4}>
        <Grid container justifyContent="center">
            <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(addTab(initialTab))}
            >
                Add new tab
            </Button>
        </Grid>
    </Box>
  );
};

export default AddTabButton;
