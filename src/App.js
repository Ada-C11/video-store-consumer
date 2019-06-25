import React, { Component } from "react";
import "./App.css";
import MovieLibrary from "./components/MovieLibrary";
import MovieSearch from "./components/MovieSearch";
import RentalCheckout from "./components/RentalCheckout";
import CustomerList from "./components/CustomerList";

import { nfapply } from "q";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayOption: null,
      hasMovie: null
    };
  }

  setDisplay = opt => {
    this.setState({ displayOption: opt });
  };

  rentMovie = movie => {
    this.setState({ hasMovie: movie });
  };

  render() {
    let optComponent;

    if (this.state.displayOption === "library") {
      optComponent = <MovieLibrary rentMovieCallback={this.rentMovie} />;
    } else if (this.state.displayOption === "search") {
      optComponent = <MovieSearch />;
    } else if (this.state.displayOption === "list") {
      optComponent = <CustomerList />;
    }

    let rental;

    if (this.state.hasMovie) {
      rental = <RentalCheckout selectedMovie={this.state.hasMovie} />;
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
        {optComponent}
        {rental}
      </div>
    );
  }
}

export default App;
