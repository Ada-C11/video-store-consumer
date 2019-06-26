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
    <tr>
      <td>{props.movie.title}</td>
      <td><button onClick={onClickDetailsButton}>View Details</button></td>
      <td><button onClick={onClickButton}>Select Movie</button></td>
      {props.viewMovieDetails && <Details {...props.movie} />}
    </tr>
  )
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Movie;