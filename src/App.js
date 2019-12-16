import React, { Component } from "react";

import "./App.css";
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
      librayMovies: [],
      customerList: [],
      checkoutStatus: false
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
    this.setState({
      librayMovies: movies
    });
  };

  addCustomers = customers => {
    this.setState({
      customerList: customers
    });
  };

  setDisplay = () => {
    this.setState({ showResults: false, checkoutStatus: false });
  };

  hasCheckedOut = (movie, customer) => {
    this.setState({
      customerList: [],
      hasMovie: null,
      hasCustomer: null,
      checkoutStatus: true
    });
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
          addCustomersCallback={this.addCustomers}
          customerList={this.state.customerList}
        />
      );
    }

    let optionalSearch;
    if (this.props.match.params.page === "MovieSearchForm") {
      optionalSearch = <MovieSearchForm getresultcallback={this.getresult} />;
    }

    let searchResults;
    if (this.state.showResults) {
      searchResults = <MovieSearchResults movies={this.state.movies} />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <Link to="/">BitaRos Amazing VideoStore </Link>
          </h1>
        </header>

        <section className="App-main">
          <RentalCheckout
            selectedMovie={this.state.hasMovie}
            selectedCustomer={this.state.hasCustomer}
            hasCheckedOutCallback={this.hasCheckedOut}
            checkoutStatus={this.state.checkoutStatus}
          />
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
