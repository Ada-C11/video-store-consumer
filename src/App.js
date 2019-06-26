import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Search from './components/Search';
import MovieLibrary from './components/MovieLibrary';
import Checkout from './components/Checkout';
import SearchResult from './components/SearchResult';
import CustomerList from './components/CustomerList';


const URL = 'http://localhost:4000/movies'

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectedCustomerName: '',
      selectedCustomerId: null,
      selectedMovie: '',
      searchResults: [],
    }
  }

  onSearchButtonCallback = (searchInput) => {
    axios.get(URL, {params: {query: searchInput}})
    .then((response) => {
      this.displaySearchResults(response.data)
    })
    .catch((error) => {
      console.log(error)  
    })
  }

  displaySearchResults = (result) => {
    console.log(result)
    this.setState({
      searchResults: result,
    });
  }

  selectCustomer = (customerName, customerId) => {
    this.setState({
      selectedCustomerName: customerName,
      selectedCustomerId: customerId,
    });
  }

  selectMovie = (movieTitle) => {
    this.setState({
      selectedMovie: movieTitle,
    });
  }

  clearSelected = () => {
    this.setState({
      selectedCustomerName: '',
      selectedCustomerId: null,
      selectedMovie: '',
    })
  }
  
  render() {
    return (
      <div className="App">
        <header>
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

          <section>
            <Checkout 
              selectedCustomerName={this.state.selectedCustomerName}
              selectedCustomerId={this.state.selectedCustomerId}
              selectedMovie={this.state.selectedMovie}
              clearSelectedCallback={this.clearSelected}
              />
          </section>
          
          <Route path="/movielibrary" render={(props) => <MovieLibrary {...props} selectedMovie={this.selectMovie} />} />
          <Route path="/search" render={(props) => <Search onSearchButtonCallback={this.onSearchButtonCallback}/>} />
          <Route path="/customerlist" render={(props) => <CustomerList {...props} selectedCustomer={this.selectCustomer} />} />
        </Router>
        </header>
        
        <section>
          <SearchResult result={this.state.searchResults}/>
        </section>
      </div>
    )
  }
}

export default App;
