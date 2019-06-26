import React, { Component } from "react";
import "./MovieSearchResults.css";

class MovieSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sendToLibraryIndicator: ""
    };
  }

  sendToLibray = movie => {
    this.setState({
      sendToLibraryIndicator: `Added ${movie.title} to the library`
    });

    this.props.addMovietoLibrayCallback(movie);
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
        <p className="send-to-library">{this.state.sendToLibraryIndicator} </p>

        <div>{collection}</div>
      </div>
    );
  }
}

export default MovieSearch;
