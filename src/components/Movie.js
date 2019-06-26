import React from 'react';
import propTypes from 'prop-types';

import './Movie.css';


const Movie = (props) => {
  const { index, title, overview, release_date, image_url, isSelectButton, callbackFunction } = props;
  // console.log(selectMovieCallback)

  // Flesh this out!
  const buttonText = isSelectButton ? "Select" : "Add to library";


  return (
    <div className="main card-body">
      <img src={image_url} />
      <h4>{title}</h4>
      <p>{release_date}</p>
      <p>{overview}</p>
      <button 
        value={index} 
        onClick={() => { callbackFunction(index) }}
      >
        {buttonText}
      </button>
    </div>
  )
}

export default Movie;