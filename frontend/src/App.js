import React from 'react';
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
