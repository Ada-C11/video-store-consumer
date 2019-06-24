import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import './Movie.css';

class Movie extends Component {


  render() {
    return (
      <div className="card">
        <div className="card__content">
          <div className="card__content-text">
            {this.props.id}
            {this.props.title}
          </div>
        </div>
      </div>
    )
  }
}

Movie.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,

};

export default Movie;
