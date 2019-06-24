import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library.js';
import Search from './components/Search.js';
import Customers from './components/Customers.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      

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
            <Link to="/library/">Library</Link>
          </li>
          <li>
            <Link to="/customers/">Customers</Link>
          </li>
        </ul>
      </nav>
{/* 
      <Route path="/" exact component={Index} /> */}
      <Route path="/search/" component={Search} />
      <Route path="/library/" component={Library} />
      <Route path="/customers/" component={Customers} />
      </div>
      </Router>
      </div>
    );
  }
}

export default App;
