import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';


// import './MovieLibrary.css';


class MovieLibrary extends Component {
  constructor() {
    super();

    this.state = {
      movies: []
    };
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
    console.log(this.state.movies)
    const displayMovies = this.state.movies.map((data) => {
      const { id, title } = data
      return (<Movie id={id} title={title} key={id} />)
    })
    return (
      <section className="movielibrary-button">
        <input
          type="button"
          value="Choose Movie"
          className="choose-movie-btn"
          onClick={this.props.currentMovieCallback} />
        {displayMovies}
      </section>
    );
  }
}

MovieLibrary.propTypes = {
  currentCustomerCallback: PropTypes.func.isRequired,
  currentMovieCallback: PropTypes.func.isRequired,
}

export default MovieLibrary;