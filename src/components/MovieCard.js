import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';
 
const MovieCard = (props) => {
  const { title, release_date, overview, image_url } = props.movie;
  const displayButton = props.filterMoviesCallback(props.movie.title) ? 
  <button type="button" onClick={props.selectMovie}>Select Movie</button> : 
  <button type="button" onClick={() => {props.addMovieCallback(props.movie)}}>Add Movie to Library</button>
  return (
    <div>
      <h4>{ title }</h4>
      <img src={image_url} alt={title} />
      <div>{ release_date }</div>
      <p>{ overview }</p>
      {displayButton}
    </div>
  );
};


MovieCard.propTypes = {
  selectMovie: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  filterMoviesCallback: PropTypes.func,
  addMovieCallback: PropTypes.func,
}

export default MovieCard;