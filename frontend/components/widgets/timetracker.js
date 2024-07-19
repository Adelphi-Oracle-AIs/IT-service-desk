// src/components/widgets/TimeTracker.js
import React, { useState, useEffect } from 'react';
import { Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, makeStyles } from '@material-ui/core';
import { PlayArrow, Pause, Stop, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  timerDisplay: {
    fontSize: '1.5rem',
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  totalTime: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

const TimeTracker = () => {
  const classes = useStyles();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (currentTask) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (currentTask && time > 0) {
      setTasks([...tasks, { name: currentTask, time }]);
      setCurrentTask('');
      setTime(0);
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const totalTime = tasks.reduce((acc, task) => acc + task.time, 0);

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        Time Tracker
      </Typography>
      <Typography variant="body1" className={classes.timerDisplay}>
        {formatTime(time)}
      </Typography>
      <input
        type="text"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
        placeholder="Enter task name"
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<PlayArrow />}
        onClick={startTimer}
        disabled={isRunning || !currentTask}
        style={{ marginRight: '10px' }}
      >
        Start
      </Button>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Pause />}
        onClick={pauseTimer}
        disabled={!isRunning}
        style={{ marginRight: '10px' }}
      >
        Pause
      </Button>
      <Button
        variant="contained"
        startIcon={<Stop />}
        onClick={stopTimer}
        disabled={!isRunning && time === 0}
      >
        Stop
      </Button>
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} className={classes.listItem}>
            <ListItemText primary={task.name} secondary={formatTime(task.time)} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="body1" className={classes.totalTime}>
        Total Time: {formatTime(totalTime)}
      </Typography>
    </>
  );
};

export default TimeTracker;
