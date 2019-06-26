import React, { Component } from "react";
import "./MovieLibrary.css";
import axios from "axios";
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

  componentDidMount() {
    axios
      .get(`http://localhost:3000/movies`)
      .then(response => {
        const movielist = response.data.map(movie => {
          this.props.addMovietoLibrayCallback(movie);
          const newMovie = {
            ...movie
          };
          return newMovie;
        });
        console.log(movielist);
      })
      .catch(error => {
        console.log(error);
        alert("Error happened");
        this.setState({ error: error.message });
      });
  }

  render() {
    const movies = this.props.librayMovies.map(movie => {
      console.log(movie);
      return (
        <section key={movie.name} className="grid-container">
          <div className="card-body">
            <img
              className="card-img-top"
              src={movie.image_url}
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
