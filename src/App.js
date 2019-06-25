import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import CustomerList from './components/CustomerList'

class App extends Component {
    state = {
      movieCollection: [],
      customers: [],
      selectedCustomer: null,
      selectedMovie: null,
    }
  
  
  componentDidMount () {
    axios.get('http://localhost:3000/movies/', { crossdomain: true })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error.message)
      })
  }
  render() {
    return (
      <div>
        <section>
          <CustomerList />
        </section>
        <section>
        {/* <MovieSearch /> */}
        </section>
      </div>
    );
  }
}

export default App;
