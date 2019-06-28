import React, { Component } from 'react';
import './Library.css';
import axios from 'axios';
import PropTypes from 'prop-types';

class Library extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies')
      .then((response) => {

        console.log('movie response.data', response.data);

        this.props.setAllMoviesCallback(response.data);
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message
        })
      })
  }


  render() {
    const { movies, onSelectMovie } = this.props;

    const mappedMovies = movies.map((movie, i) => {
      return (
        <div key={i} className='library-card'>
          <img className='library-movie-image' src={movie.image_url} alt={movie.title} />
          <p className='library-movie-title'>{movie.title}</p>
          <button type='button' onClick={onSelectMovie(movie)}  className='library-select-movie'>Select Movie</button>

        </div>

      );
    });
    return (
      <div>
        <h3 className='library-title'>Browse the Rental Library</h3>

        <section className="library-display-movies">
          {mappedMovies}
        </section>
      </div>
    );
  }
}

Library.propTypes = {
  setAllMoviesCallback: PropTypes.func.isRequired,
  onSelectMovie: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
};

export default Library;