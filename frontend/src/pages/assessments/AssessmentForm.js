import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { divide } from 'lodash';

// Common component for displaying assessment forms
function AssessmentForm({ title, formContent }) {
  return (
    // <Box sx={{ mx: 'auto', p: 2 }}>
    <div style={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          {title}
        </Typography>
        <Box sx={{ 
          mt: 3,
          '& img': {
            width: '100%',
            height: 'auto',
            display: 'block',
            mb: 2
          }
        }}>
          {formContent}
        </Box>
      </Paper>
    {/* </Box> */}
    </div>
    
  );
}

export default AssessmentForm;
