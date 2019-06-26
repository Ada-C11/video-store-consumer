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
      selectedMovie: '',
      searchResults: [],
      movieLibrary: [],
      addConfirmation: true,
      errorMessage: []
    }
  }

  componentDidMount = () => {
    const movieLibrary = [];
    axios.get(URL)
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
  }

  onSearchButtonCallback = (searchInput) => {
    axios.get(URL, {params: {query: searchInput}})
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

  selectCustomer = (customerName) => {
    this.setState({
      selectedCustomer: customerName,
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
      axios.post(URL, addedMovieData)
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
    console.log(movieTitle);
    this.setState({
      selectedMovie: movieTitle,
    });
  }

  clearSearchResults = () =>{
    this.setState({
      searchResults: [],
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
            </nav>

            <section>
              <Checkout 
                selectedCustomer={this.state.selectedCustomer}
                selectedMovie={this.state.selectedMovie}
                />
            </section>

            <Route path="/" />
           
            <Route path="/movielibrary" render={(props) => <MovieLibrary {...props} allMovies={this.state.movieLibrary} selectedMovie={this.selectMovie} />} />

            <Route path="/search" render={(props) => <Search onSearchButtonCallback={this.onSearchButtonCallback}/>} />

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
