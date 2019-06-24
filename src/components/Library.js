import React, { Component } from 'react';
import propTypes from 'prop-types';

class Library extends Component {
  render() {
    return(
      <div>
        <h2>This is the Movie Library!</h2>
        {this.props.thing}
      </div>
    )
  }
}

export default Library;