import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Search from './components/Search';
import MovieLibrary from './components/MovieLibrary';
import Customer from './components/Customer';
import Checkout from './components/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Router>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/search'>Search</Link>
                </li>
                <li>
                  <Link to='/movielibrary'>Movie Library</Link>
                </li>
                <li>
                  <Link to='/customers'>Customer List</Link>
                </li>
                <li>
                  <Link to='/checkout'>Checkout</Link>
                </li>
              </ul>
            </nav>
           
            <Route path="/search" component={Search} />
            <Route path="/movielibrary" component={MovieLibrary} />
            <Route path="/customers" component={Customer} />
            <Route path="/checkout" component={Checkout} />

          </Router>
        </header>




      
      </div>
    );
  }
}

export default App;
