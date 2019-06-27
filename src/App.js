import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./App.css";
import registerServiceWorker from "./registerServiceWorker";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

import MovieLibrary from "./components/MovieLibrary";
import MovieSearchResults from "./components/MovieSearchResults";
import RentalCheckout from "./components/RentalCheckout";
import CustomerList from "./components/CustomerList";
import MovieSearchForm from "./components/MovieSearchForm";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      displayOption: null,
      hasMovie: null,
      hasCustomer: null,
      searchComplete: false,
      librayMovies: []
    };
  }

  getresult = movies => {
    this.setState({
      movies: movies,
      searchComplete: true
    });
  };

  rentMovieWithMovie = movie => {
    this.setState({ hasMovie: movie });
  };

  rentMovieWithCustomer = customer => {
    this.setState({ hasCustomer: customer });
  };

  // what to do with duplicate clicks to add to library
  addMovietoLibray = movie => {
    this.setState({
      librayMovies: [...this.state.librayMovies, movie]
    });
  };

  render() {
    let optionalComponent;

    if (this.props.page === "library") {
      optionalComponent = (
        <MovieLibrary
          rentMovieWithMovieCallback={this.rentMovieWithMovie}
          librayMovies={this.state.librayMovies}
          addMovietoLibrayCallback={this.addMovietoLibray}
        />
      );
    } else if (this.props.page === "list") {
      optionalComponent = (
        <CustomerList
          rentMovieWithCustomerCallback={this.rentMovieWithCustomer}
        />
      );
    }

    let optionalSearch;
    if (this.props.page === "search") {
      optionalSearch = <MovieSearchForm getresultcallback={this.getresult} />;
    }

    let rentalMovie;

    if (this.state.hasMovie || this.state.hasCustomer) {
      rentalMovie = (
        <RentalCheckout
          selectedMovie={this.state.hasMovie}
          selectedCustomer={this.state.hasCustomer}
        />
      );
    }

    let searchResults;
    if (this.state.searchComplete) {
      searchResults = (
        <MovieSearchResults
          movies={this.state.movies}
          addMovietoLibrayCallback={this.addMovietoLibray}
        />
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Link to="/">BitaRos Amazing VideoStore </Link>
          </h1>
        </header>
        <section className="App-main">
          <Link to="/MovieLibrary">
            <button type="button" className="movie-display" aria-label="Close">
              <p>Movie Library</p>
            </button>
          </Link>
          <Link to="/MovieSearchForm">
            <button type="button" className="movie-display" aria-label="Close">
              <p>Movie Search</p>
            </button>
          </Link>
          <Link to="/CustomerList">
            <button type="button" className="movie-display" aria-label="Close">
              <p>Customer List</p>
            </button>
          </Link>
          {optionalSearch}
        </section>
        <section>
          {searchResults}
          {optionalComponent}
          {rentalMovie}
        </section>
      </div>
    );
  }
}

export default App;
