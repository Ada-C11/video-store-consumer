import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './MovieList.css';
import Movie from './Movie';

class MovieList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMovie: undefined
    }
  }

  MovieCards() {
    axios.get('http://localhost:3000/movies')
      .then((response) => {
        const allMovies = response.data
        this.props.setMovieState(allMovies)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.MovieCards();
  }

  render() {
    const allMovies = this.props.movies.map((movie) => {
      return (
        < Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          release_date={movie.release_date}
          onSelectMovieCallback={this.props.onSelectMovieCallback}
          image_url={movie.image_url}
        />
      );
    });
    return (
      <div className="movie-cards">
        {allMovies}
      </div>
    );
  }
}

MovieList.propTypes = {
  setMovieState: PropTypes.func,
  onSelectMovieCallback: PropTypes.func,
  movies: PropTypes.array,
};

export default MovieList;