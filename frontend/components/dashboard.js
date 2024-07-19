// src/components/Dashboard.js
import React from 'react';
import { Container, Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import TaskOverview from './widgets/TaskOverview';
import TimeTracker from './widgets/TimeTracker';
import ProjectStatus from './widgets/ProjectStatus';
import ResourceUtilization from './widgets/ResourceUtilization';
import CodeSnippetLibrary from './widgets/CodeSnippetLibrary';
import ServerStatus from './widgets/ServerStatus';
import RecentActivities from './widgets/RecentActivities';
import UpcomingDeadlines from './widgets/UpcomingDeadlines';

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
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(0, 255, 0, 0.2)',
    height: '100%',
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Tempest IT Command Center
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <TaskOverview />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <TimeTracker />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <ProjectStatus />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <ResourceUtilization />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <CodeSnippetLibrary />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={classes.paper}>
            <ServerStatus />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <RecentActivities />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <UpcomingDeadlines />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

// src/components/Dashboard.js
import React from 'react';
import { Container, Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import CodeSnippet from './CodeSnippet';
import ProjectTemplates from './ProjectTemplates';
import TaskManager from './TaskManager';
import TimeTracker from './TimeTracker';

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
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(0, 255, 0, 0.2)',
  },
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Task Manager</Typography>
            <TaskManager />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Time Tracker</Typography>
            <TimeTracker />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Code Snippets</Typography>
            <CodeSnippet />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Project Templates</Typography>
            <ProjectTemplates />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
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
