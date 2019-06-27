import React from 'react';
import propTypes from 'prop-types';
import MoviePopup from './MoviePopup2'

import './Movie.css';


const Movie = (props) => {
  const { index, title, overview, release_date, image_url, isSelectButton, callbackFunction } = props;
  // console.log(selectMovieCallback)
  // console.log("Inventory", props.inventory)

  const buttonText = isSelectButton ? "Select" : "Add to library";


  return (
    <div className="main card-body">
      <img src={image_url} />
      <h4 className="movie-title">{title}</h4>
      <p>{release_date}</p>
      {/* <p>{overview}</p> */}
      <div className="flex">
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