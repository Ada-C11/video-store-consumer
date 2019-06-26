import React, { Component } from "react";
import "./App.css";
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

  setDisplay = option => {
    this.setState({ displayOption: option, searchComplete: false });
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

    if (this.state.displayOption === "library") {
      optionalComponent = (
        <MovieLibrary
          rentMovieWithMovieCallback={this.rentMovieWithMovie}
          librayMovies={this.state.librayMovies}
          addMovietoLibrayCallback={this.addMovietoLibray}
        />
      );
    } else if (this.state.displayOption === "list") {
      optionalComponent = (
        <CustomerList
          rentMovieWithCustomerCallback={this.rentMovieWithCustomer}
        />
      );
    }

    let optionalSearch;
    if (this.state.displayOption === "search") {
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

    let searchResults = "";
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
          <h1 className="App-title">BitaRos Amazing VideoStore</h1>
        </header>
        <section className="App-main">
          <button
            type="button"
            className="movie-display"
            aria-label="Close"
            onClick={() => this.setDisplay("library")}
          >
            <p>Movie Library </p>
          </button>
          <button
            type="button"
            className="movie-display"
            aria-label="Close"
            onClick={() => this.setDisplay("search")}
          >
            <p>Movie Search </p>
          </button>
          <button
            type="button"
            className="movie-display"
            aria-label="Close"
            onClick={() => this.setDisplay("list")}
          >
            <p>CustomerList </p>
          </button>
          {optionalSearch}

        </section>
        <section className="movie-body">
          {searchResults}
          {optionalComponent}
          {rentalMovie}
        </section>
      </div>
    );
  }
}

export default App;
