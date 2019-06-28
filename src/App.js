import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library';
import Customers from './components/Customers';
import Search from './components/Search';
import Rental from './components/Rental';
import './App.css';
  



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCustomers: [],
      allMovies: [],
      tmdbId: null,
      selectedCustomer: null,
      selectedMovie: null,
      newMovie: null,
      errorMessage: null,
      successMessage: null,
      newMovieAddedSuccessMessage: null,
      newMovieNotAddedErrorMessage: null,
    }
  }

  setAllMovies = (moviesArray) => {
    this.setState({
      allMovies: moviesArray,
    });
  }
  
  selectMovie = (movie) => {
    return () => {
      this.setState({
        selectedMovie: movie,
        successMessage: null,
      });
    }
  }

  selectNewMovieFromExternalLibrary = (movie) => {
    return () => {
      this.setState({
        newMovie: movie,
      });
    }
  }

  clearNewMovieFromExternalLibraryDetails = (movie) => {
    this.setState({
      newMovie: null,
      newMovieAddedSuccessMessage: `${this.state.newMovie.title} was successfully added to the library!`
    });
  }

  selectCustomer = (customer) => {
    // console.log(id);
    return () => {
      this.setState({
      selectedCustomer: customer,
      successMessage: null,
    })
  }
}
  
  setAllCustomers = (customerArray) => {
    this.setState({
      allCustomers: customerArray,
    })
    console.log('hi', this.state.allCustomers);
  }

  clearRentalDetails = () => {
    this.setState({
      selectedCustomer: null,
      selectedMovie: null,
      successMessage: 'Successful rental!'
    })
  }
  



  render() {
    

    const {allCustomers, allMovies, selectedCustomer, selectedMovie, successMessage } = this.state;

    return(
      <div className='home-page'>
      <Router>
        <div className="nav">
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

          <Route path="/" exact component={Title}/>
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
                onSelectMovie={this.selectNewMovieFromExternalLibrary}
                newMovie={this.state.newMovie}
                movies={allMovies}
                clearNewMovieFromExternalLibraryDetailsCallback={this.clearNewMovieFromExternalLibraryDetails}
              />
            }
          />
        </div>
        {successMessage && <div>{`${successMessage}`}</div>}
          
          {(selectedCustomer || selectedMovie) && <div className='rentalSummary'><Rental 
          rentalCustomer={selectedCustomer}
          rentalMovie={selectedMovie}
          clearRentalDetailsCallback={this.clearRentalDetails} /></div>}
      </Router>
    </div>
    );
  }
}

function Title() {
  return (
      <section>
        <div className="title">Heaza Video Store </div>
        <p className="sub-heading">Est. 1987</p>
      </section>
  );
}

export default App;
