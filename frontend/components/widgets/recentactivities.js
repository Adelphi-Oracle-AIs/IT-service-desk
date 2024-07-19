// src/components/widgets/RecentActivities.js
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Chip, Button, makeStyles } from '@material-ui/core';
import { Computer, Security, Storage, Code, BugReport, Build } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  timeStamp: {
    color: theme.palette.text.secondary,
    fontSize: '0.8rem',
  },
  loadMore: {
    marginTop: theme.spacing(2),
  },
}));

const RecentActivities = () => {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);

  const fetchActivities = (pageNum) => {
    // In a real application, this would be an API call
    const mockActivities = [
      { id: 1, user: 'John Doe', action: 'Deployed new version', project: 'Web App', category: 'Deployment', timestamp: '2023-06-15T10:30:00Z' },
      { id: 2, user: 'Jane Smith', action: 'Fixed security vulnerability', project: 'Database', category: 'Security', timestamp: '2023-06-15T09:45:00Z' },
      { id: 3, user: 'Mike Johnson', action: 'Added new feature', project: 'Mobile App', category: 'Development', timestamp: '2023-06-15T08:15:00Z' },
      { id: 4, user: 'Sarah Brown', action: 'Optimized database queries', project: 'CRM System', category: 'Performance', timestamp: '2023-06-14T16:20:00Z' },
      { id: 5, user: 'Tom Wilson', action: 'Resolved critical bug', project: 'Payment Gateway', category: 'Bugfix', timestamp: '2023-06-14T14:50:00Z' },
      // ... more activities ...
    ];
    setActivities(prevActivities => [...prevActivities, ...mockActivities]);
  };

  useEffect(() => {
    fetchActivities(page);
  }, [page]);

  const getActivityIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'deployment':
        return <Computer />;
      case 'security':
        return <Security />;
      case 'development':
        return <Code />;
      case 'performance':
        return <Storage />;
      case 'bugfix':
        return <BugReport />;
      default:
        return <Build />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Recent Activities
      </Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id} className={classes.listItem}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {getActivityIcon(activity.category)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <strong>{activity.user}</strong> {activity.action} in <strong>{activity.project}</strong>
                </>
              }
              secondary={
                <>
                  <Chip
                    label={activity.category}
                    size="small"
                    className={classes.chip}
                  />
                  <span className={classes.timeStamp}>
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="outlined"
        color="primary"
        onClick={loadMore}
        className={classes.loadMore}
        fullWidth
      >
        Load More
      </Button>
    </>
  );
};

export default RecentActivities;
