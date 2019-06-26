import React, { Component } from "react";
import "./App.css";
import MovieLibrary from "./components/MovieLibrary";
import MovieSearch from "./components/MovieSearch";
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
      searchComplete: false
    };
  }

  getresult = movies => {
    movies.map(movie => {
      this.state.movies.push(movie);
    });

    this.setState({ searchComplete: true });
  };

  setDisplay = option => {
    this.setState({ displayOption: option });
  };

  rentMovieWithMovie = movie => {
    this.setState({ hasMovie: movie });
  };

  rentMovieWithCustomer = customer => {
    this.setState({ hasCustomer: customer });
  };

  render() {
    let optionalComponent;

    if (this.state.displayOption === "library") {
      optionalComponent = (
        <MovieLibrary rentMovieWithMovieCallback={this.rentMovieWithMovie} />
      );
    } else if (this.state.displayOption === "search") {
      optionalComponent = (
        <MovieSearchForm getresultcallback={this.getresult} />
      );
    } else if (this.state.displayOption === "list") {
      optionalComponent = (
        <CustomerList
          rentMovieWithCustomerCallback={this.rentMovieWithCustomer}
        />
      );
    }

    let rentalMovie;

    if (this.state.hasMovie && this.state.hasMovie) {
      rentalMovie = (
        <RentalCheckout
          selectedMovie={this.state.hasMovie}
          selectedCustomer={this.state.hasCustomer}
        />
      );
    }

    let searchResults = "";
    if (this.state.searchComplete === true) {
      
      searchResults = <MovieSearch movies={this.state.movies} />
      
    }

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">BitaRos Amazing VideoStore</h1>
        </header>
        <section>
          <button
            type="button"
            className="btn btn-danger"
            aria-label="Close"
            onClick={() => this.setDisplay("library")}
          >
            Movie Library
          </button>
          <button
            type="button"
            className="btn btn-danger"
            aria-label="Close"
            onClick={() => this.setDisplay("search")}
          >
            Movie Search
          </button>
          <button
            type="button"
            className="btn btn-danger"
            aria-label="Close"
            onClick={() => this.setDisplay("list")}
          >
            CustomerList
          </button>
        </section>
        <div>{searchResults} </div>

        {optionalComponent}
        <section>{rentalMovie}</section>
      </div>
    );
  }
}

export default App;
