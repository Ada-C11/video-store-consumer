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

  // routing = (
  //   <Router>
  //     <div>
  //       <ul>
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li>
  //           <Link to="/MovieLibrary">MovieLibrary</Link>
  //         </li>
  //         <li>
  //           <Link to="/MovieSearchForm">MovieSearchForm</Link>
  //         </li>

  //         <li>
  //           <Link to="/CustomerList">CustomerList</Link>
  //         </li>
  //       </ul>
  //       <Route exact path="/" component={App} />
  //       <Route path="/MovieLibrary" component={MovieLibrary} />
  //       <Route path="/MovieSearchForm" component={MovieSearchForm} />
  //       <Route path="/CustomerList" component={CustomerList} />
  //     </div>
  //   </Router>
  // );

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
          {/* <h1 className="App-title">BitaRos Amazing VideoStore</h1> */}
        </header>
        <section className="App-main">
          <button
            type="button"
            className="movie-display"
            aria-label="Close"
            onClick={() => this.setDisplay("library")}
          >
            <Link to="/MovieLibrary">Movie Library</Link>{" "}
            {/* <p>Movie Library </p> */}
          </button>
          <button
            type="button"
            className="movie-display"
            aria-label="Close"
            onClick={() => this.setDisplay("search")}
          >
            <Link to="/MovieSearchForm">Movie Search</Link>{" "}
            {/* <p>Movie Search </p> */}
          </button>
          <button
            type="button"
            className="movie-display"
            aria-label="Close"
            onClick={() => this.setDisplay("list")}
          >
            <Link to="/CustomerList">Customer List</Link>{" "}
            {/* <p>Customer  List </p> */}
          </button>
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
ReactDOM.render(<app/>, document.getElementById("root"));
registerServiceWorker();

