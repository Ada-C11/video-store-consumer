import React from 'react';
import propTypes from 'prop-types';
import MoviePopup from './MoviePopup2'


const Movie = (props) => {
  const { index, title, overview, release_date, image_url, isSelectButton, callbackFunction } = props;
  // console.log(selectMovieCallback)

  // Flesh this out!
  const buttonText = isSelectButton ? "Select" : "Add to library";


  return (
    <div>
      <h3>{title}</h3>
      <ul>
        <li><img src={image_url} /></li>
        <li>{release_date}</li>
        <li>{overview}</li>
      </ul>
      <button
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
  )
}

export default Movie;