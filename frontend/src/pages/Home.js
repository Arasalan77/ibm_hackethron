import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 600,
          width: '100%',
        }}
      >
        <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom align="center">
          MedAI Paperless IPD
        </Typography>
      </Paper>
    </Box>
  );
}

export default Home;
