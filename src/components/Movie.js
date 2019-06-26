import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Movie = (props) => {
  const selectMovie = () => {
    return props.selectMovieCallback(props.id)
  }

  return (
    <div className="movie">
        <div className="movie__section">
          <h3 className="movie__title">{props.title}</h3>
            <img className="image" src={props.image_url} alt="this is an image"/>
            <div className="middle">
              <div className="text">{props.overview}</div>
            </div>
          <div className="movie__info">
          <li><a href="#" onClick={selectMovie}>Select Movie</a></li>
          </div>
        </div>
    </div>
  )
}


Movie.propTypes = {
  id:PropTypes.number,
  title:PropTypes.string,
  overview:PropTypes.string,
  release_date:PropTypes.string,
  image_url:PropTypes.string,
  external_id:PropTypes.number,
  buttonClassname:PropTypes.string,
  selectMovieCallback:PropTypes.func,
};

export default Movie;
