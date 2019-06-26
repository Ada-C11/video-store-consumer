import React, { Component } from "react";
import "./MovieLibrary.css";

class MovieLibrary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: ""
    };
  }

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
      const movies = this.props.librayMovies.map(movie => {
        return (
          <section key={movie.title}>
            <span> {movie.title} </span>

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
