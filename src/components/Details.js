import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './Details.css';
// import './Library.css';

const Details = (props) => {
  const movieDetails = () => {
    return (

      <div>
        <h3 className="title">{props.title}</h3>
        <p><span className="bold_words">Release Date: </span>{props.release_date}</p>
        <p><span className="bold_words">Overview: </span>{props.overview}</p>
      </div>
    )
  };

  return movieDetails();
}

Details.propTypes = {
  // showMovie: PropTypes.array.isRequired,
};

export default Details;