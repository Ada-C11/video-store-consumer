import React, { Component } from "react";
import "./App.css";
import MovieLibrary from "./components/MovieLibrary";
import MovieSearch from "./components/MovieSearch";
import { nfapply } from "q";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayOption: null
    };
  }

  setDisplay = opt => {
    this.setState({ displayOption: opt });
  };

  rentMovie = (movie) => {
    console.log({movie})
  }

  render() {
    let optComponent;

    if (this.state.displayOption === "library") {
      optComponent = <MovieLibrary rentMovieCallback={this.rentMovie}/>;
    } else if (this.state.displayOption === "search") {
      optComponent = <MovieSearch />;
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
      </div>
    );
  }
}

export default App;
