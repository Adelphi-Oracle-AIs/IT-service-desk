// src/components/widgets/ServerStatus.js
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, LinearProgress, Tooltip, IconButton, makeStyles } from '@material-ui/core';
import { Refresh, CheckCircle, Warning, Error } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  serverName: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  statusIcon: {
    marginRight: theme.spacing(1),
  },
  metricsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
  metricItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    width: '70%',
    height: 8,
    borderRadius: 5,
  },
}));

const ServerStatus = () => {
  const classes = useStyles();
  const [servers, setServers] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchServerStatus = () => {
    // In a real application, this would be an API call
    const mockServers = [
      {
        id: 1,
        name: 'Web Server 1',
        status: 'online',
        cpu: 65,
        memory: 80,
        disk: 50,
        network: 30,
      },
      {
        id: 2,
        name: 'Database Server',
        status: 'warning',
        cpu: 85,
        memory: 70,
        disk: 90,
        network: 60,
      },
      {
        id: 3,
        name: 'Application Server',
        status: 'offline',
        cpu: 0,
        memory: 0,
        disk: 45,
        network: 0,
      },
    ];
    setServers(mockServers);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle style={{ color: 'green' }} />;
      case 'warning':
        return <Warning style={{ color: 'orange' }} />;
      case 'offline':
        return <Error style={{ color: 'red' }} />;
      default:
        return null;
    }
  };

  const getMetricColor = (value) => {
    if (value < 70) return 'primary';
    if (value < 90) return 'secondary';
    return 'error';
  };

  return (
    <>
      <div className={classes.title}>
        <Typography variant="h6">
          Server Status
        </Typography>
        <Tooltip title={`Last updated: ${lastUpdated.toLocaleTimeString()}`}>
          <IconButton size="small" onClick={fetchServerStatus}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </div>
      <Grid container spacing={2}>
        {servers.map((server) => (
          <Grid item xs={12} sm={6} md={4} key={server.id}>
            <Paper className={classes.paper}>
              <div className={classes.serverName}>
                {getStatusIcon(server.status)}
                <Typography variant="subtitle1">{server.name}</Typography>
              </div>
              <div className={classes.metricsContainer}>
                {['cpu', 'memory', 'disk', 'network'].map((metric) => (
                  <div className={classes.metricItem} key={metric}>
                    <Typography variant="body2">{metric.toUpperCase()}:</Typography>
                    <Tooltip title={`${server[metric]}%`} placement="top">
                      <LinearProgress
                        variant="determinate"
                        value={server[metric]}
                        className={classes.progressBar}
                        color={getMetricColor(server[metric])}
                      />
                    </Tooltip>
                  </div>
                ))}
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ServerStatus;
