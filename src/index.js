import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Library from './components/Library'
import CustomerList from './components/CustomerList'

import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <ul>
        <li className="nav-link">
          <Link to="/">Rewind Movies</Link>
        </li>
        <li className="nav-link">
          <Link to="/movies">Movies</Link>
        </li>
        <li className="nav-link">
          <Link to="customers">Customer Registry</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/movies" component={Library} />
      <Route path="/customers" component={CustomerList} />
    </div>
  </Router>
)
ReactDOM.render( routing, document.getElementById('root')
);
registerServiceWorker();
