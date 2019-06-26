import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Movie = (props) => {

  const onClickMovie = () => {
    props.getMovieTitleCallback(props.title, props.id)
  }


  return (
    <div className="movie">
      <li>
        <div className="movie__section">
            <img className="image" src={props.image_url} alt="this is an image"/>
            <div class="middle">
              <div class="text">{props.overview}</div>
            </div>
          <div className="movie__info">
            <span>
              <button onClick={onClickMovie}
                className="movie__choose">
                Select for rental
              </button>
            </span>
            <h3 className="movie__title">{props.title}</h3>
          </div>
        </div>
      </li>
    </div>
  )
}

// onClick={() => props.deleteCardCallback(props.id)}

Movie.propTypes = {
  id:PropTypes.number,
  title:PropTypes.string,
  overview:PropTypes.string,
  release_date:PropTypes.string,
  image_url:PropTypes.string,
  external_id:PropTypes.number,
  buttonClassname:PropTypes.string,
  grabMovieTitleCallback:PropTypes.func,
};

export default Movie;
