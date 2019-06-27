import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Details from './Details';
import './Movie.css';

const Movie = (props) => {
  const onClickButton = () => {
    props.onSelectMovieCallback(props.movie.id)
  }

  const onClickDetailsButton = () => {
    props.onClickDetailsCallback(props.movie.id)
  }
  
  return (
    <tr>
      <td className="movie_container">
        <img src={props.movie.image_url} alt={props.movie.title}/>
        <div className="movie_description">
          <h3 className="title">{props.movie.title}</h3>
          <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
          <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
          <button onClick={onClickDetailsButton}>View Details</button>
          <button onClick={onClickButton}>Select Movie</button>
          {props.viewMovieDetails && <Details {...props.movie} />}
        </div>
      </td>
    </tr>
  )
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Movie;