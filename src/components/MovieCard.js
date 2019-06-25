import React from 'react';
import PropTypes from 'prop-types';

import './MovieCard.css';



const MovieCard = (props) => {
  const { id, title, overview, release_date, image_url, external_id, inventory } = props;

  return (
    <div>{title}</div>
  );
};

export default MovieCard;