import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Details from './Details';
// import './Movie.css';

const Movie = (props) => {
  const onClickButton = () => {
    props.onSelectMovieCallback(props.movie.id)
  }

  const onClickDetailsButton = () => {
    props.onClickDetailsCallback(props.movie.id)
  }
  
  return (
    <div>{props.movie.title}
      <button onClick={onClickDetailsButton}>View Details</button>
      <button onClick={onClickButton}>Select Movie</button>
      {props.viewMovieDetails && <Details {...props.movie} />}
    </div>
  )
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Movie;