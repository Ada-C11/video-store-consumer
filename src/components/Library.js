import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
// import './Library.css';

const Library = (props) => {
  const movieCollection = props.library.map((movie, i) => {
    return <li key={i}>
      <Movie 
        movie={movie} 
        viewMovieDetails={props.expandedMovies[movie.id]} 
        onClickDetailsCallback={props.onClickDetailsCallback} 
        onSelectMovieCallback={props.onSelectMovieCallback}
      />
    </li>
   });
   
  return (
    <div>
      <h2>Library</h2>
      <ul>{movieCollection}</ul>
    </div>
  )
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  onClickDetailsCallback: PropTypes.func.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Library;