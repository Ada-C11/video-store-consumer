import React, { Component } from "react";
// import logo from "./logo.svg";
import "./MovieSearchResults.css";

class MovieSearch extends Component {
  constructor(props) {
    super(props);
  }

  sendToLibray = movie => {
    this.props.addMovietoLibrayCallback(movie);
    console.log(movie)
  };

  render() {
    const collection = this.props.movies.map(movie => {
      return (
        <section key={movie.id}>
          <span> {movie.title} </span>

          <button
            type="button"
            className="btn btn-danger"
            aria-label="Close"
            onClick={() => this.sendToLibray(movie)}
          >
            SELECT
          </button>
        </section>
      );
    });
    return (
      <div>
        <div>{collection}</div>
      </div>
    );
  }
}

export default MovieSearch;
