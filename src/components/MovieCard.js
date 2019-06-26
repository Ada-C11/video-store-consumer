import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = (props) => {
  const { title, release_date, overview, image_url } = props.movie;
  return (
    <div>
      <h4>{ title }</h4>
      <img src={image_url} alt={title} />
      <div>{ release_date }</div>
      <p>{ overview }</p>
      <button type="button" onClick={props.selectMovie}>Select Movie</button>
    </div>
  );
};


MovieCard.propTypes = {
  selectMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
}

export default MovieCard;