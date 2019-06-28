import React from 'react';
import PropTypes from 'prop-types';
import './MovieDetails.css';

const MovieDetails = (props) => {
  const movieDetails = () => {
    return (
      <div>
        <h3 className="title">{props.title}</h3>
        <p><span className="bold_words">Release Date: </span>{props.release_date}</p>
        <p><span className="bold_words">Overview: </span>{props.overview}</p>
        <p><span className="bold_words">Inventory: </span>{props.inventory}</p>
        <p><span className="bold_words">Available Inventory: </span>{props.available_inventory}</p>
      </div>
    )
  };

  return movieDetails();
}

MovieDetails.propTypes = {
  external_id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieDetails;