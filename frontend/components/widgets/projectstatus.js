// src/components/widgets/ProjectStatus.js
import React from 'react';
import { Typography, List, ListItem, ListItemText, LinearProgress, Chip, makeStyles } from '@material-ui/core';
import { Assignment, Warning, CheckCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  projectInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  progressBar: {
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
}));

const ProjectStatus = () => {
  const classes = useStyles();

  const projects = [
    { 
      id: 1, 
      name: 'Server Migration', 
      progress: 75, 
      status: 'on-track', 
      dueDate: '2023-08-15',
      assignee: 'John Doe'
    },
    { 
      id: 2, 
      name: 'Network Upgrade', 
      progress: 30, 
      status: 'at-risk', 
      dueDate: '2023-07-30',
      assignee: 'Jane Smith'
    },
    { 
      id: 3, 
      name: 'Security Audit', 
      progress: 100, 
      status: 'completed', 
      dueDate: '2023-06-30',
      assignee: 'Bob Johnson'
    },
    { 
      id: 4, 
      name: 'Cloud Integration', 
      progress: 10, 
      status: 'on-track', 
      dueDate: '2023-09-30',
      assignee: 'Alice Brown'
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle style={{ color: 'green' }} />;
      case 'at-risk':
        return <Warning style={{ color: 'orange' }} />;
      case 'completed':
        return <CheckCircle style={{ color: 'blue' }} />;
      default:
        return <Assignment />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return 'green';
      case 'at-risk':
        return 'orange';
      case 'completed':
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Project Status
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project.id} className={classes.listItem}>
            <div className={classes.projectInfo}>
              <Typography variant="subtitle1">{project.name}</Typography>
              <Chip
                icon={getStatusIcon(project.status)}
                label={project.status}
                size="small"
                style={{ backgroundColor: getStatusColor(project.status), color: 'white' }}
                className={classes.chip}
              />
            </div>
            <LinearProgress 
              variant="determinate" 
              value={project.progress} 
              className={classes.progressBar}
              color={project.status === 'at-risk' ? 'secondary' : 'primary'}
            />
            <div>
              <Chip label={`Due: ${project.dueDate}`} size="small" className={classes.chip} />
              <Chip label={`Assignee: ${project.assignee}`} size="small" className={classes.chip} />
            </div>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProjectStatus;
