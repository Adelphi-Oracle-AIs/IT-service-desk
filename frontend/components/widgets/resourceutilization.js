// src/components/widgets/ResourceUtilization.js
import React from 'react';
import { Typography, Grid, Paper, LinearProgress, Tooltip, makeStyles } from '@material-ui/core';
import { Person, Computer, Storage } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  resourceName: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  utilizationText: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ResourceUtilization = () => {
  const classes = useStyles();

  const resources = [
    { name: 'John Doe', type: 'human', utilization: 85 },
    { name: 'Jane Smith', type: 'human', utilization: 60 },
    { name: 'Bob Johnson', type: 'human', utilization: 95 },
    { name: 'Web Server', type: 'server', utilization: 70 },
    { name: 'Database Server', type: 'server', utilization: 80 },
    { name: 'Storage Array', type: 'storage', utilization: 55 },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'human':
        return <Person className={classes.icon} />;
      case 'server':
        return <Computer className={classes.icon} />;
      case 'storage':
        return <Storage className={classes.icon} />;
      default:
        return null;
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization < 50) return 'primary';
    if (utilization < 80) return 'secondary';
    return 'error';
  };

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Resource Utilization
      </Typography>
      <Grid container spacing={2}>
        {resources.map((resource, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper className={classes.paper}>
              <div className={classes.resourceName}>
                {getIcon(resource.type)}
                <Typography variant="subtitle1">{resource.name}</Typography>
              </div>
              <Tooltip title={`${resource.utilization}% utilized`} placement="top">
                <LinearProgress
                  variant="determinate"
                  value={resource.utilization}
                  className={classes.progressBar}
                  color={getUtilizationColor(resource.utilization)}
                />
              </Tooltip>
              <div className={classes.utilizationText}>
                <Typography variant="caption">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </Typography>
                <Typography variant="caption">{resource.utilization}%</Typography>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ResourceUtilization;
