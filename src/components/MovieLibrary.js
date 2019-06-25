import React, { Component } from "react";
import "./MovieLibrary.css";

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [
        "heart_eyes",
        "beer",
        "clap",
        "sparkling_heart",
        "heart_eyes_cat",
        "dog"
      ],

      selectedMovie: ""
    };
  }

  addMovie = movie => {
    const newState = this.state;
    newState.movies.push(movie);

    this.setState(newState);
  };

  selectToAddToCheckout = movie => {
    this.setState({
      selectedMovie: movie
    });

    this.props.rentMovieCallback(movie);
  };

  render() {
    if (this.state.selected) {
      return <div>{this.state.selectedMovie}</div>;
    } else {
      const movies = this.state.movies.map(movie => {
        return (
          <section>
            <span> {movie} </span>

            <button
              type="button"
              className="btn btn-danger"
              aria-label="Close"
              onClick={() => this.selectToAddToCheckout(movie)}
            >
              SELECT
            </button>
          </section>
        );
      });
      return (
        <div>
          <h2> Movie Library</h2> {movies}
        </div>
      );
    }
  }
}

export default MovieLibrary;
