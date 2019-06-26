import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],

    }
  }

  componentDidMount() {
    const fullUrl = "http://localhost:3000/movies"
    axios.get(fullUrl)
      .then((response) => {
        const movies = response.data.map((movie) => {
          const newMovie = {
            image_url: movie.image_url,
            overview: movie.overview,
            release_date: movie.release_date,
            title: movie.title,
            id: movie.id,
          }
          return newMovie;
        })

        this.setState({ movies });

      })
      .catch((error) => {
        this.setState({ errorMessages: error.message });
      });
  }

  render() {
    const displayMovies = this.state.movies.map((movie) => {
      const { id, image_url, title, overview, release_date, external_id, } = movie;
      return (
        <div className="card" key={id}>
          <img src={image_url} alt="movie poster" className="card-img-top" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{id}</li>
            <li className="list-group-item">{title}</li>
            <li className="list-group-item">Overview: {overview}</li>
            <li className="list-group-item">Release date: {release_date}</li>
            <button className="" onClick={this.props.currentMovieCallback(movie)} > Select this Movie </button>
          </ul>
        </div>
      )
    })
    return (
      <section className="row">
        {displayMovies}
      </section>
    )
  }
}

Movie.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  overview: PropTypes.string,
  release_date: PropTypes.instanceOf(Date),
  external_id: PropTypes.number,
};

export default Movie;
