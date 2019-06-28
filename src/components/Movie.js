import React from 'react';
import PropTypes from 'prop-types';
import MovieDetails from './MovieDetails';
import './Movie.css';

const Movie = (props) => {
  const onSelectMovie = () => {
    props.onSelectMovieCallback(props.movie.id)
  }

  const onViewMovieDetails = () => {
    props.onClickMovieDetailsCallback(props.movie.id)
  }
  
  return (
    <tr>
      <td className="movie_container">
        <img src={props.movie.image_url} alt={props.movie.title}/>
        <div className="movie_description">
          <h3 className="title">{props.movie.title}</h3>
          <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
          <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
          <button onClick={onViewMovieDetails}>View Details</button>
          <button onClick={onSelectMovie}>Select Movie</button>
          {props.viewMovieDetails && <MovieDetails {...props.movie} />}
        </div>
      </td>
    </tr>
  )
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
  viewMovieDetails: PropTypes.bool,
  onClickMovieDetailsCallback: PropTypes.func.isRequired,
  onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Movie;