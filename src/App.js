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
      showResults: false,
      librayMovies: []
      
    };
  }

  getresult = movies => {
    this.setState({
      movies: movies,
      showResults: true
    });
  };

  rentMovieWithMovie = movie => {
    this.setState({ hasMovie: movie });
  };

  rentMovieWithCustomer = customer => {
    this.setState({ hasCustomer: customer });
  };

  addMovietoLibray = movies => {
    // Movies could be single or array of movies
    const movieList = Array.isArray(movies) ? movies : [movies];
    this.setState({
      librayMovies: [...this.state.librayMovies, ...movieList]
    });
  };

  setDisplay = () => {
    this.setState({ showResults: false });
  };

  render() {
    let optionalComponent;

    if (this.props.match.params.page === "MovieLibrary") {
      optionalComponent = (
        <MovieLibrary
          rentMovieWithMovieCallback={this.rentMovieWithMovie}
          librayMovies={this.state.librayMovies}
          addMovietoLibrayCallback={this.addMovietoLibray}
        />
      );
    } else if (this.props.match.params.page === "CustomerList") {
      optionalComponent = (
        <CustomerList
          rentMovieWithCustomerCallback={this.rentMovieWithCustomer}
        />
      );
    }

    let optionalSearch;
    if (this.props.match.params.page === "MovieSearchForm") {
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
    if (this.state.showResults) {
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
          {rentalMovie}
          <Link to="/MovieLibrary">
            <button
              type="button"
              className="movie-display"
              aria-label="Close"
              onClick={this.setDisplay}
            >
              <p>Movie Library</p>
            </button>
          </Link>
          <Link to="/MovieSearchForm">
            <button
              type="button"
              className="movie-display"
              aria-label="Close"
              onClick={this.setDisplay}
            >
              <p>Movie Search</p>
            </button>
          </Link>
          <Link to="/CustomerList">
            <button
              type="button"
              className="movie-display"
              aria-label="Close"
              onClick={this.setDisplay}
            >
              <p>Customer List</p>
            </button>
          </Link>
          {optionalSearch}
        </section>
        <section>
          {searchResults}
          {optionalComponent}
        </section>
      </div>
    );
  }
}

export default App;
