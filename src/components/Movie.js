import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./Movie.css"


const Movie = (props) => {
  const selectMovie = () => {
    return props.selectMovieCallback(props.id)
  }

  return (
    <div className="movie card">
        <div className="movie__section card-body">
          <h3 className="movie__title card-title">{props.title}</h3>
            <img className="card-img-top" src={props.image_url} alt="this is an image"/>
            <div className="middle">
              <div className="text card-text">{props.overview}</div>
            </div>
          <div className="select_button">
            <button className=" select__movie btn btn-dark"><a href="#" onClick={selectMovie}>Select Movie</a></button>
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
