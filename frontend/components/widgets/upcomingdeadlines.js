// src/components/widgets/UpcomingDeadlines.js
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, makeStyles } from '@material-ui/core';
import { AddAlarm, Flag, Timer } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const UpcomingDeadlines = () => {
  const classes = useStyles();
  const [deadlines, setDeadlines] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newDeadline, setNewDeadline] = useState({ task: '', project: '', deadline: '' });

  const fetchDeadlines = () => {
    // In a real application, this would be an API call
    const mockDeadlines = [
      { id: 1, task: 'Complete security audit', project: 'Web App', deadline: '2023-06-20', priority: 'High' },
      { id: 2, task: 'Deploy v2.0', project: 'Mobile App', deadline: '2023-06-25', priority: 'Medium' },
      { id: 3, task: 'Client presentation', project: 'CRM System', deadline: '2023-06-30', priority: 'High' },
      { id: 4, task: 'Optimize database', project: 'Analytics Platform', deadline: '2023-07-05', priority: 'Low' },
    ];
    setDeadlines(mockDeadlines);
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleDeadlineChange = (field) => (event) => {
    setNewDeadline({ ...newDeadline, [field]: event.target.value });
  };

  const handleAddDeadline = () => {
    if (newDeadline.task && newDeadline.project && newDeadline.deadline) {
      setDeadlines([...deadlines, { ...newDeadline, id: deadlines.length + 1, priority: 'Medium' }]);
      setNewDeadline({ task: '', project: '', deadline: '' });
      handleCloseDialog();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'error';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'primary';
      default:
        return 'default';
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h6">
          Upcoming Deadlines
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddAlarm />}
          onClick={handleOpenDialog}
          className={classes.addButton}
          size="small"
        >
          Add
        </Button>
      </div>
      <List>
        {deadlines.map((deadline) => (
          <ListItem key={deadline.id} className={classes.listItem}>
            <ListItemText
              primary={deadline.task}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
                    {deadline.project}
                  </Typography>
                  {' — '}
                  {deadline.deadline}
                </>
              }
            />
            <Chip
              icon={<Flag />}
              label={deadline.priority}
              size="small"
              color={getPriorityColor(deadline.priority)}
              className={classes.chip}
            />
            <Chip
              icon={<Timer />}
              label={`${getDaysUntilDeadline(deadline.deadline)} days`}
              size="small"
              color={getDaysUntilDeadline(deadline.deadline) <= 3 ? 'secondary' : 'default'}
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Deadline</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            label="Task"
            value={newDeadline.task}
            onChange={handleDeadlineChange('task')}
            fullWidth
          />
          <TextField
            label="Project"
            value={newDeadline.project}
            onChange={handleDeadlineChange('project')}
            fullWidth
          />
          <TextField
            label="Deadline"
            type="date"
            value={newDeadline.deadline}
            onChange={handleDeadlineChange('deadline')}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddDeadline} color="primary" variant="contained">
            Add Deadline
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpcomingDeadlines;
