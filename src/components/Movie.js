import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// import './Movie.css';

class Movie extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
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
    const displayMovies = this.state.movies.map((data) => {
      const { id, title } = data;
      return (
        <div className="movie">
          {id}
          {title}
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

};

export default Movie;
