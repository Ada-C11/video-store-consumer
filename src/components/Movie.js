import React from 'react';
import propTypes from 'prop-types';

const Movie = (props) => {
  const { index, title, overview, release_date, image_url } = props;

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        <li><img src={image_url} /></li>
        <li>{release_date}</li>
        <li>{overview}</li>
      </ul>
    </div>
  )
}

export default Movie;