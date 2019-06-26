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
        />
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

    if (this.state.hasMovie || this.state.hasCustomer) {
      rentalMovie = (
        <RentalCheckout
          selectedMovie={this.state.hasMovie}
          selectedCustomer={this.state.hasCustomer}
        />
      );
    }

    let searchResults = "";
    if (this.state.searchComplete === true) {
      searchResults = (
        <MovieSearchResults
          movies={this.state.movies}
          addMovietoLibrayCallback={this.addMovietoLibray}
        />
      );
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
