// src/components/widgets/TaskOverview.js
import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemIcon, makeStyles } from '@material-ui/core';
import { Assignment, CheckCircle, Error, Schedule } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  listItemIcon: {
    minWidth: '30px',
  },
}));

const TaskOverview = () => {
  const classes = useStyles();

  const tasks = [
    { id: 1, title: 'Server Maintenance', status: 'completed' },
    { id: 2, title: 'Network Upgrade', status: 'in-progress' },
    { id: 3, title: 'Security Audit', status: 'pending' },
    { id: 4, title: 'Database Optimization', status: 'in-progress' },
  ];

  const getIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle style={{ color: 'green' }} />;
      case 'in-progress':
        return <Schedule style={{ color: 'orange' }} />;
      case 'pending':
        return <Error style={{ color: 'red' }} />;
      default:
        return <Assignment />;
    }
  };

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Task Overview
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} className={classes.listItem}>
            <ListItemIcon className={classes.listItemIcon}>{getIcon(task.status)}</ListItemIcon>
            <ListItemText primary={task.title} secondary={task.status} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TaskOverview;
