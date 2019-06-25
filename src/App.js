import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

//  Below code is modified from React Router Tutorial https://reacttraining.com/react-router/web/guides/quick-start

function Index() {
  return <h2>Home</h2>;
}

function Search() {
  return <h2>Search</h2>;
}
function Library() {
  return <h2>Library</h2>;
}

function Customers() {
  return <h2>Customers</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search/">Search</Link>
            </li>
            <li>
              <Link to="/library/">Library</Link>
            </li>
            <li>
              <Link to="/customers/">Customers</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/search/" exact component={Search} />
        <Route path="/library/" component={Library} />
        <Route path="/customers/" component={Customers} />
      </div>
    </Router>
  );
}

export default AppRouter;