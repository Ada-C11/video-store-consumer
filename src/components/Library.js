import React from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types'

const Library = (props) => {
  const { movieLibrary, selectMovie, filterMoviesCallback } = props;

  const movieCards = props.movieLibrary.map((movie, i) => {
    return (
        <MovieCard key={i} movie={movie} filterMoviesCallback={props.filterMoviesCallback} selectMovie={() => {props.selectMovie(movie)}} />
      )
  })
  return (
    <div>
      <p>Movie Library</p>
      { movieCards }
    </div>
  );
}

Library.propTypes = {
  movieLibrary: PropTypes.array,
  selectMovie: PropTypes.func.isRequired,
  filterMoviesCallback: PropTypes.func.isRequired,
}

export default Library;