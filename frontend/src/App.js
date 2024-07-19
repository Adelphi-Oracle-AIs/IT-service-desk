// src/App.js
import CyberBackground from './components/CyberBackground';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CyberBackground />
      <Router>
        {/* ... rest of the code ... */}
      </Router>
    </ThemeProvider>
  );
}
// src/App.js
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00ff00', // Neon green
    },
    secondary: {
      main: '#0099ff', // Bright blue for contrast
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          '&::after': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'radial-gradient(rgba(0, 255, 0, 0.1) 2px, transparent 2px)',
            backgroundSize: '50px 50px',
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

const theme = createMuiTheme({
  // INPUT NEEDED: Choose your color scheme
  palette: {
    primary: {
      main: '#1976d2', // You can change this color
    },
    secondary: {
      main: '#dc004e', // You can change this color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import KnowledgeBase from './components/KnowledgeBase/KnowledgeBase';
import ArticleDetail from './components/KnowledgeBase/ArticleDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/kb" component={KnowledgeBase} />
        <Route path="/kb/:id" component={ArticleDetail} />
        {/* Add other routes here */}
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>IT Service Desk</h1>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
