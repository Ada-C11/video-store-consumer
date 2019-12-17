import React from 'react';
import PropTypes from 'prop-types';

import './MovieResult.css';

const MovieResult = (props) => {
    return (
        <div className="movie">
            <div className="movie__section">
              <h3 className="movie__title">{props.title}</h3>
                <img className="image" src={props.image_url} alt="movie cover"/>
                <div class="middle">
                  <div class="text">{props.overview}</div>
                </div>
              <div className="movie__info">
                <span>
                </span> 
              </div>
              <button onClick={() => props.addMovieToLibraryCallback(props)} >
                Add Movie to Library
              </button>
            </div>
        </div>
      )
}

MovieResult.propTypes= {
  id:PropTypes.number,
  title:PropTypes.string,
  overview:PropTypes.string,
  release_date:PropTypes.string,
  image_url:PropTypes.string,
  external_id:PropTypes.number,
}
export default MovieResult;