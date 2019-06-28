import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Search from './components/Search';
import MovieLibrary from './components/MovieLibrary';
import Checkout from './components/Checkout';
import SearchResult from './components/SearchResult';
import CustomerList from './components/CustomerList';
import Home from './components/Home'

const URL_MOVIES = 'http://localhost:4000/movies';
const URL_CUSTOMERS = 'http://localhost:4000/customers';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedCustomerName: '',
      selectedCustomerId: null,
      selectedMovie: '',
      searchResults: undefined,
      movieLibrary: [],
      allCustomers: [],
      addConfirmation: true,
      behaviorMessage: '',
      messageStatus: false,
      siteAreaStatus: 'free',
      welcomeMessage: 'Welcome to our Movie store',
      displaySideBar: false,
    }
  }

  componentDidMount = () => {
    const movieLibrary = [];
    axios.get(URL_MOVIES)
    .then((response) => {
      response.data.forEach((element) => {
        movieLibrary.push(element);
      })
      this.setState({movieLibrary, });
    })
    .catch((error) => {
      this.displayMessages(error.message);
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
      this.displayMessages(error.message)
    })
  }

  onSearchButtonCallback = (searchInput) => {

    if (searchInput === ''){
      const emptyMovieMessage = `Empty is not a valid title`
      this.displayMessages(emptyMovieMessage)
    
    } else {
      axios.get(URL_MOVIES, {params: {query: searchInput}})
      .then((response) => {
        this.displaySearchResults(response.data);
      })
      .catch((error) => {
        const apiErrorMessage = error.data || error.message
        console.log(error.message)
        this.displayMessages(apiErrorMessage)
        
      })
    }
    this.setState({
      searchResults: undefined,
    });
  }

  displaySearchResults = (result) => {
    this.setState({
      searchResults: result,
      siteAreaStatus: 'result',
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

    addedMovieData.image_url = (addedMovieData.image_url).replace('https://image.tmdb.org/t/p/w185','');

    let repeated = 0;
    this.state.movieLibrary.map((v) => {
      if (v.external_id === addedMovieData.external_id) {
        repeated += 1;
      }
    })
    
    if (repeated === 0) {
      axios.post(URL_MOVIES, addedMovieData)
      .then((response) => {
        this.displayMessages(`${response.data.title} added to movie library`)
      })
      .catch((error)=> {
        console.log(error);
      })
    } else {
      let repeatedMovieMessage = `${movieToAdd.title} is already in the movie library`
      
      this.displayMessages(repeatedMovieMessage)
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
      searchResults: undefined,
    })
  }

  displayMessages = (message) => {
    console.log(message)
 
    if (message === 'Network Error'){
      message += ' - Make sure the API is running!'
      
    } else {
      setTimeout(() => {this.setState({
        behaviorMessage: '',
        messageStatus: false,
        siteAreaStatus: '',
       })}, 3000);
    }
    
    this.setState({
      behaviorMessage: message,
      siteAreaStatus: 'message',
      messageStatus: true,
    })
    
  }

  display =() => {
    return (
      <section className={"result-message-display"}>
      <p>{this.state.behaviorMessage}</p>
      </section>)
  }

  setSiteAreaBusy = () => {
    this.setState({
      searchResults: undefined,
      siteAreaStatus: '',
      welcomeMessage: '',
      displaySideBar: true
    })
    this.displaySideBar()
  }

  setSiteAreaFree = () => {
    this.setState({
      searchResults: undefined,
      siteAreaStatus: 'free',
      welcomeMessage: '',
      displaySideBar: true,
    })
    this.displaySideBar()
  }

  homeBanner = () => {
    this.setState({
      siteAreaStatus: 'home',
      welcomeMessage: 'We have some good movies!',
      searchResults: undefined,
      displaySideBar: false,

    })
  }

  displaySideBar = () => {
    return (
      <section className="side-area">
            <section className="checkout">
                <Checkout 
                  selectedCustomerName={this.state.selectedCustomerName}
                  selectedCustomerId={this.state.selectedCustomerId}
                  selectedMovie={this.state.selectedMovie}
                  clearSelectedCallback={this.clearSelected}
                  displayMessages={this.displayMessages}
                  refreshList={this.componentDidMount}
                  />
              </section>
          </section>
    )
  }

  
  render() {
    return (
      <div className="App">
        <Router>
          <nav>
            <ul>
              <li className="home-link">
                <Link className="nav-option" to='/' onClick={this.homeBanner}><span>Home</span></Link>
              </li>
             
              <li>
                <Link className="nav-option" to='/movielibrary' onClick={this.clearSearchResults &&this.setSiteAreaBusy}><span>Movies</span></Link>
              </li>
              <li>
                <Link className="nav-option" to='/customerlist' onClick={this.clearSearchResults &&this.setSiteAreaBusy}><span>Customers</span> </Link>
              </li>
              <li>
                <Link className="nav-option" to='/search' onClick={this.clearSearchResults && this.setSiteAreaFree}><span>Search</span></Link>
              </li>
            </ul>
          </nav>

            {this.state.messageStatus ? this.display() : ''}

            

            {this.state.displaySideBar ? this.displaySideBar() : ''}

            <section className={"site-content-" + this.state.siteAreaStatus}>
                
              <Route exact path="/" render={(props) => <Home welcomeMessage={this.state.welcomeMessage}/>}/>

              <Route path="/movielibrary" render={(props) => <MovieLibrary {...props} allMovies={this.state.movieLibrary} selectedMovie={this.selectMovie}/>} />

              <Route path="/search" render={(props) => <Search onSearchButtonCallback={this.onSearchButtonCallback}/>} />

              <Route path="/customerlist" render={(props) => <CustomerList {...props} allCustomers={this.state.allCustomers} selectedCustomer={this.selectCustomer} displayMessages={this.displayMessages} />} />

             
                <SearchResult result= {this.state.searchResults} addMovieToLibraryCallback={this.addMovieToLibraryCallback} />
              

            </section>
        </Router> 
      </div>
    )
  }
}

export default App;
