import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import './App.css';
import CustomerList from './components/CustomerList'
import Library from './components/Library'


class App extends Component {
  state = {
    selectedCustomer: null,
    selectedMovie: null,
  }

  selectCustomer = (customerID) => {
    console.log('select Customer in App')
    
  }
  
  render() {
    return (
      <div>
        <h1> Rewind Movies Home Page </h1>
      </div>
    );
  }
}

export default App;
