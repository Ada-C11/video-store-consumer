import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MovieLibrary.css';

const MovieLibrary = (props) => {
  return (
    <div>library stuff</div>
  )
}

MovieLibrary.propTypes = {
  quote: PropTypes.string.isRequired,
  emoji: PropTypes.string
};

export default MovieLibrary;