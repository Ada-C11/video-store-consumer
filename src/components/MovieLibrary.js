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
      .get(`http://localhost:3001/movies`)
      .then(response => {
        const movielist = response.data;

        this.props.addMovietoLibrayCallback(movielist);
      })
      .catch(error => {
        alert("Error happened");
        this.setState({ error: error.message });
      });
  }

  render() {
    const movies = this.props.librayMovies.map(movie => {
      return (
        <section key={movie.id}>
          <div>
            <img
              className="card-img-top"
              src={movie.image_url}
              alt="Card image cap"
            />
            <h5>{movie.title}</h5>
            <button
              type="button"
              className="block"
              aria-label="Close"
              onClick={() => this.selectToCheckoutMovie(movie)}
            >
              ADD TO CHECKOUT
            </button>
          </div>
        </section>
      );
    });
    return (
      <React.Fragment>
        <h2> Movie Library</h2>
        <section className="movie-grid">{movies}</section>
      </React.Fragment>
    );
  }
}

export default MovieLibrary;
