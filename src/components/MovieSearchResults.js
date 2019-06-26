import React, { Component } from "react";
import Movie from "./Movie";
import "./MovieSearchResults.css";

class MovieSearchResults extends Component {
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
    const collection = this.props.movies.map((movie, i) => {
      console.log(movie)
      return (
        <Movie
          key={i}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          releaseDate={movie.release_date}
          image={movie.poster_path}

          sendToLibrayCallback={this.sendToLibray}
        />
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

export default MovieSearchResults;
