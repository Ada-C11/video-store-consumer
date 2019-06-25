import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Search from './components/Search';
import MovieLibrary from './components/MovieLibrary';
import Checkout from './components/Checkout';
import CustomerList from './components/CustomerList';
import Customer from './components/Customer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: '',
    }
  }

  selectCustomer = (customerName) => {
    console.log(customerName);
    this.setState({
      selectedCustomer: customerName,
    });
  }

  render() {
    return (
      <div className="App">
        
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
                  <Link to='/customerlist'>Customer List</Link>
                </li>
              </ul>
            </nav>
           
            <Route path="/search" component={Search} />
            <Route path="/movielibrary" component={MovieLibrary} />
            <Route path="/customerlist" render={(props) => <CustomerList {...props} selectedCustomer={this.selectCustomer} />} />

          </Router>

          <section>
            <Checkout selectedCustomer={this.state.selectedCustomer}/>
          </section>
      </div>
    );
  }
}

export default App;
