// src/components/Dashboard.js
import React from 'react';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* INPUT NEEDED: Decide on dashboard widgets */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Tasks Overview</Typography>
            {/* We'll add a task list component here later */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Quick Stats</Typography>
            {/* We'll add quick stats here later */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
