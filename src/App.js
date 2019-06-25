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
      selectedCustomer: '',
      searchResults: [],
    }
  }

  onSearchButtonCallback = (searchInput) => {

    axios.get(URL, {params: {query: searchInput}})
    .then((response) => {
      console.log(response.data);

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


  selectCustomer = (customerName) => {
    console.log(customerName);
    this.setState({
      selectedCustomer: customerName,
    });
  }

  addMovieToLibraryCallback = (movieToAdd) =>{
  
    let addedMovieData = {
      ...movieToAdd
    }

    console.log(addedMovieData)

    axios.post(URL, addedMovieData)
    .then((response) => {
      console.log(response)


    })
    .catch((error)=>{
      console.log(error)
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
            <Route path="/search" render={(props) => <Search onSearchButtonCallback={this.onSearchButtonCallback}/>} />
            <Route path="/movielibrary" component={MovieLibrary} />
            <Route path="/customerlist" render={(props) => <CustomerList {...props} selectedCustomer={this.selectCustomer} />} />
          </Router>
        </header>
        <section>
          <SearchResult result={this.state.searchResults} addMovieToLibraryCallback={this.addMovieToLibraryCallback}/>
          <Checkout selectedCustomer={this.state.selectedCustomer}/>
        </section>
      </div>
    )
  }
}

export default App;
