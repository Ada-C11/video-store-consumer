import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import './Movie.css';

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
      const { id, title, overview, release_date, external_id, image_url } = movie;

      return (
        <div className="movie_data" key={id}>
          <img src={image_url} alt="movie poster" className="movie-poster" />
          <ul>
            <li>{id}</li>
            <li>{title}</li>
            <li>Overview: {overview}</li>
            <li>Release date: {release_date}</li>
            <li>External ID: {external_id}</li>
            <button className="select_movie_button" onClick={this.props.currentMovieCallback(movie)} > Select this Movie </button>
          </ul>
        </div>
      )
    })
    return (
      <section className="movies_list">
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
