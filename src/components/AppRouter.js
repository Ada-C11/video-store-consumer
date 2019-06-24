import React, { Component } from 'react';
// import logo from './logo.svg';
// import './AppRouter.css';

import Search from './Search';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

// function Search() {
//   return <h2>Search Movies</h2>;
// }

function Library() {
  return <h2>Movie Library</h2>;
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
              <Link to="/search/">Search Movies</Link>
            </li>
            <li>
              <Link to="/library/">Movie Library</Link>
            </li>
            <li>
              <Link to="/customers/">Customers</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/search/" component={Search} />
        <Route path="/library/" component={Library} />
        <Route path="/customers/" component={Customers} />
      </div>
    </Router>
  );
}

export default AppRouter;
