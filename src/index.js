import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import MovieSearch from './components/MovieSearch'


import registerServiceWorker from './registerServiceWorker';

const routing = (
  <Router>
    <div>
      <ul className="nav-menu">
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/movies">Rewind Movies</Link>
        </li>
        <li className="nav-link">
          <Link to="customers">Customer Registry</Link>
        </li>
        <li className="nav-link">
          <Link to="moviesearch">Search Movie Database</Link>
        </li>
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/movies" component={Library} />
      <Route path="/customers" component={CustomerList} />
      <Route path="/moviesearch/" component={MovieSearch} />
    </div>
  </Router>
)

ReactDOM.render( routing, document.getElementById('root')
);
registerServiceWorker();
