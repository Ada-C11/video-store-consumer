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
    const movies = this.props.librayMovies.map(movie => {
      return (
        <section key={movie.id}>
          <div className="card w-75">
            <div className="card-body">
              <img
                className="card-img-top"
                src={"https://image.tmdb.org/t/p/w185/" + movie.image}
                alt="Card image cap"
              />
              <h5 className="card-title">Title: {movie.title}</h5>
              <p className="card-text">ID: {movie.id}</p>
              <br />
              <button
                type="button"
                className="btn btn-danger"
                aria-label="Close"
                onClick={() => this.selectToCheckoutMovie(movie)}
              >
                SELECT
              </button>
            </div>
          </div>
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

export default MovieLibrary;
