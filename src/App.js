import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import Library from './components/Library';
import Customers from './components/Customers';
import Search from './components/Search';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCustomers: [],
      allMovies: [],
      tmdbId: null,
      customerId: null,
      movieId: null,
      errorMessage: null,
    }
  }

  setAllMovies = (moviesArray) => {
    this.setState({
      allMovies: moviesArray,
    });
  }
  
  selectMovie = (id) => {
    return () => {
      this.setState({
        movieId: id,
      });
    }
  }

  selectCustomer = (id) => {
    // console.log(id);
    return () => {
      this.setState({
      customerId: id,
    })
  }
}
  
  setAllCustomers = (customerArray) => {
    this.setState({
      allCustomers: customerArray,
    })
    console.log('hi', this.state.allCustomers);
  }
  

  render() {
    console.log('Movie id: ', this.state.movieId);

    console.log('Customer id: ', this.state.customerId);

    const {allCustomers, allMovies} = this.state;

    return(
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/movies">Movies</Link>
            </li>

            <li>
              <Link to="/customers">Customers</Link>
            </li>

            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>

          <hr />

          <Route path="/" />
          <Route path="/movies" 
            render={(props) => 
              <Library 
                setAllMoviesCallback={this.setAllMovies}
                movies={allMovies}
                onSelectMovie={this.selectMovie}
                isAuthed={true} 
              />
            } 
          />
          <Route path="/customers"
          render={(props) => 
            <Customers
            setAllCustomersCallback={this.setAllCustomers}
            customers={allCustomers}
            selectCustomerCallback={this.selectCustomer}
            isAuthed = {true}
          />}/>
          <Route path="/search" 
            render={(props) => 
              <Search 
              
              />
            }
          />
        </div>
      </Router>

    );
  }
}


export default App;
