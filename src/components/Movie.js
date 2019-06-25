import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
// import './Movie.css';

const Movie = (props) => {
  const onClickButton = () => {
    props.onSelectCallback(props.id)
  }

  return (
    <div>{props.title}<button onClick={onClickButton}>Rent Movie</button></div>
  )
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onSelectCallback: PropTypes.func.isRequired,
};

export default Movie;