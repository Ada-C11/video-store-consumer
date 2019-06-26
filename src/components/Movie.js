import React from 'react';
import PropTypes from 'prop-types';
import './Movie.css'

const Movie = (props) => {

  const onMovieClick = () => {
    // props.callback(props.id)
    console.log('movie onClick callback')
  }

  return (

    <div className="card width">
      <img className="card-img-top" src={props.imageUrl} alt={props.title} />
      <div className="movie-card card-body">
        <button
          className="btn btn-secondary"
          onClick={onMovieClick}>
          Add to Library
        </button>
        <h2 className="card-title">{props.title}</h2>
        <h4 className="card-text">{props.overview}</h4>
        <h4 className="card-text">{props.releaseDate}</h4>
      </div>
    </div>
  )
}

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.string,
  imageUrl: PropTypes.string,
  external_id: PropTypes.number
};

export default Movie;