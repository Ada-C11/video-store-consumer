import React, { Component } from 'react';
// import axios from 'axios'
import './App.css';
import CustomerList from './components/CustomerList'
import Library from './components/Library'


class App extends Component {
    state = {
      selectedCustomer: null,
      selectedMovie: null,
    }
  
  render() {
    return (
      <div>
        <section>
          <CustomerList />
        </section>
        <section>
        <Library />
        </section>
      </div>
    );
  }
}

export default App;
