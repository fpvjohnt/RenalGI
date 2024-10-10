import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function HealthCard({ title, imageSrc, description }) {
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img src={imageSrc} alt={title} style={{ width: '100%', borderRadius: '8px' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" style={{ marginBottom: '10px' }}>
            {title}
          </Typography>
          <Typography variant="body1">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HealthCard;
