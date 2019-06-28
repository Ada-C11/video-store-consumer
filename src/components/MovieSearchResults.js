import React, { Component } from "react";
import Movie from "./Movie";
import "./MovieSearchResults.css";
import axios from "axios";

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

    axios
      .post(`http://localhost:3001/movies`, {
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        image_url: "https://image.tmdb.org/t/p/w185/" + movie.image,
        inventory: 5
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error.messages);
        alert("Error happened");
        this.setState({ error: error.message });
      });
  };

  render() {
    const collection = this.props.movies.map((movie, i) => {
      return (
        <Movie
          key={movie.id}
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
      <React.Fragment>
        <p className="send-to-library">{this.state.sendToLibraryIndicator} </p>
        <h2>Movie Search Results</h2>
        <section className="movie-grid">{collection}</section>
      </React.Fragment>
    );
  }
}

export default MovieSearchResults;
