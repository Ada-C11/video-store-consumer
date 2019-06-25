import React, { Component } from "react";
import "./MovieLibrary.css";

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: ["short", "not", "ghost", "blah"],
      selectedMovie: ""
    };
  }

  // searchMovie = movie => {
  //   const newState = this.state;
  //   newState.movies.push(movie);

  //   this.setState(newState);
  // };

  selectToCheckoutMovie = movie => {
    this.setState({
      selectedMovie: movie
    });

    this.props.rentMovieWithMovieCallback(movie);
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
              onClick={() => this.selectToCheckoutMovie(movie)}
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
