import React from 'react';
import Container from '@mui/material/Container';
import AddTabButton from '../components/form/AddTabButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Page = ({
  children,
  title,
  description,
}: {
  title: string;
  description: string;
  children: any;
}) => {
  return (
    <Container fixed>
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {title}
            </Typography>
            <Typography variant="subtitle1" component="h4" gutterBottom>
                {description}
            </Typography>
            {children}
            <AddTabButton />
        </Box>
    </Container>
  );
};

export default Page;
