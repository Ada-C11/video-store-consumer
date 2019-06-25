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

    // Grace's suggested edits for this portion, starting with line 9:
    // constructor() {
    //   super();
    //   this.state = {
    //     selectedMovie: null,
    //     selectedCustomer: null,
    //   };
    // }

    // selectMovieForRental = (movieTitle) => {
    //   this.setState({
    //     selectedMovie: movieTitle
    //   })
    // }
  
    // selectCustomerForRental = (customerObject) => {
    //   this.setState({
    //     selectedCustomer: customerObject
    //   })
    // }
  
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
