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
      const { id, image_url, title, overview, release_date } = movie;
      return (
        <div className="card" key={id}>
          <img src={image_url} alt="movie poster" className="card-img-top" />
          <ul className="card_data-ul">
            <li className="card_data-li">{id}</li>
            <li className="card_data-li">{title}</li>
            <li className="card_data-li">Overview: {overview}</li>
            <li className="card_data-li">Release date: {release_date}</li>
            <button className="" onClick={this.props.currentMovieCallback(movie)} > Select this Movie </button>
          </ul>
        </div>
      )
    })
    return (
      <div className="content_container">
        <h1 className="green_text">Movies</h1>
        <section className="card_container">
          {displayMovies}
        </section>
      </div>
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
