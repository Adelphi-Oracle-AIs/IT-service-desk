// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(5px)',
  },
  title: {
    flexGrow: 1,
    fontFamily: "'Orbitron', sans-serif",
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Tempest IT SaaS
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/projects">Projects</Button>
        <Button color="inherit" component={Link} to="/resources">Resources</Button>
        <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {/* INPUT NEEDED: Choose your app name */}
          IT Optimization SaaS
        </Typography>
        <Button color="inherit" component={Link} to="/">Dashboard</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
