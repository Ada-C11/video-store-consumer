import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import './App.css';
import axios from 'axios';

import Search from './components/Search';
import MovieLibrary from './components/MovieLibrary';
import Checkout from './components/Checkout';
import SearchResult from './components/SearchResult';
import CustomerList from './components/CustomerList';


const URL_MOVIES = 'http://localhost:4000/movies';
const URL_CUSTOMERS = 'http://localhost:4000/customers'

class App extends Component {
  constructor(){
    super();
    this.state = {
      selectedCustomerName: '',
      selectedCustomerId: null,
      selectedMovie: '',
      searchResults: [],
      movieLibrary: [],
      allCustomers: [],
      addConfirmation: true,
      errorMessage: []
    }
  }

  componentDidMount = () => {
    const movieLibrary = [];
    axios.get(URL_MOVIES)
    .then((response) => {
      console.log(response.data);
      response.data.forEach((element) => {
        movieLibrary.push(element);
      })
      this.setState({movieLibrary, });
    })
    .catch((error) => {
      const errorMessage = this.state.errorMessage;
      const newError = error.response.data.errors.text;
      newError.forEach((text) => {
        errorMessage.push(text);
      })
      this.setState({errorMessage, });
    })

    const allCustomers = [];
    axios.get(URL_CUSTOMERS)
    .then((response) => {
      response.data.forEach((element) => {
        allCustomers.push(element);
      })
      this.setState({allCustomers, });
    })
    .catch((error) => {
      const errorMessage = this.state.errorMessage;
      const newError = error.response.data.errors.text;
      newError.forEach((text) => {
        errorMessage.push(text);
      })
      this.setState({errorMessage, });
    })
  }

  onSearchButtonCallback = (searchInput) => {
    axios.get(URL_MOVIES, {params: {query: searchInput}})
    .then((response) => {
      this.displaySearchResults(response.data)
    })
    .catch((error) => {
      console.log(error)  
    })
    this.setState({
      searchResults: [],
    })
  }

  displaySearchResults = (result) => {
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

  addMovieToLibraryCallback = (movieToAdd) =>{
    let addedMovieData = {
      ...movieToAdd
    }

    addedMovieData.image_url = (addedMovieData.image_url).replace('https://image.tmdb.org/t/p/w185','')

    let repeated = 0;
    this.state.movieLibrary.map((v) => {
        if (v.external_id === addedMovieData.external_id){
          console.log('the movie already exist in the library')
          repeated += 1
        }
    })
    
    if (repeated === 0){
      axios.post(URL_MOVIES, addedMovieData)
      .then((response) => {
        console.log(`movie ${response.data.title} added`)
        console.log(this.state.movieLibrary)
        this.componentDidMount()
        
      })
      .catch((error)=>{
        console.log(error)
      })
    } 
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
    });
  }

  clearSearchResults = () => {
    this.setState({
      searchResults: [],
    })
  }
  
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to='/' onClick={this.clearSearchResults}>Home</Link>
              </li>
              <li>
                <Link to='/search'>Search</Link>
              </li>
              <li>
                <Link to='/movielibrary' onClick={this.clearSearchResults}>Movie Library</Link>
              </li>
              <li>
                <Link to='/customerlist' onClick={this.clearSearchResults}>Customer List</Link>
              </li>
            </ul>
            <section>
              <Checkout 
                selectedCustomerName={this.state.selectedCustomerName}
                selectedCustomerId={this.state.selectedCustomerId}
                selectedMovie={this.state.selectedMovie}
                clearSelectedCallback={this.clearSelected}
                refreshList={this.componentDidMount}
              />
            </section>
          </nav>

          <section>
            <div><Route path="/" /></div>
            <div><Route path="/movielibrary" render={(props) => <MovieLibrary {...props} allMovies={this.state.movieLibrary} selectedMovie={this.selectMovie} />} /></div>
            <div><Route path="/search" render={(props) => <Search onSearchButtonCallback={this.onSearchButtonCallback}/>} /></div>
            <div><Route path="/customerlist" render={(props) => <CustomerList {...props} allCustomers={this.state.allCustomers} selectedCustomer={this.selectCustomer} />} /></div>
            <div><SearchResult result={this.state.searchResults} addMovieToLibraryCallback={this.addMovieToLibraryCallback}/></div>
          </section>
        </Router>
      </div>
    )
  }
}

export default App;
