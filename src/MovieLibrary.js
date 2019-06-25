import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MovieLibrary.css';

class MovieLibrary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movieList: []
    }
  }
  
  render () {
    return (
      <div>library stuff</div>
    )
  }
}

MovieLibrary.propTypes = {
  
};

export default MovieLibrary;