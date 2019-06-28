import React from 'react';
import propTypes from 'prop-types';
import MoviePopup from './MoviePopup2'

import './Movie.css';


const Movie = (props) => {
  const { index, title, overview, release_date, image_url, isSelectButton, callbackFunction } = props;
  const buttonText = isSelectButton ? "Select" : "Add to library";

  return (
    <div className="main card-body">
      <img src={image_url} />
      <h4 className="movie-title">{title}</h4>
      <div className="flex button-row">
        <button
          className="button"
          value={index}
          onClick={() => { callbackFunction(index) }}
        >
          {buttonText}
        </button>
        <MoviePopup
          movie={props}
          buttonText={buttonText}
        />
      </div>

    </div>
  )
}

export default Movie;