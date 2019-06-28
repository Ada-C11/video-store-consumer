import React from 'react';
import PropTypes from 'prop-types';
import './MovieCard.css';
 
const MovieCard = (props) => {
  const { title, release_date, overview, image_url } = props.movie;
  const displayButton = props.filterMoviesCallback(props.movie.title) ? 
  <button type="button" className="btn btn-info" onClick={props.selectMovie}>Select Movie</button> : 
  <button type="button" className="btn btn-info" onClick={() => {props.addMovieCallback(props.movie)}}>Add Movie to Library</button>
  return (
    
    // <div className="card">
    //   <div className="card-body">
    //       <img className="card-img-top" src={image_url} alt={ title } />
    //       <h4 className="movie-title">{ title }</h4>
    //       <p className="card-text">{ overview }</p>
    //       {displayButton}
    //   </div>
    // </div>

    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={image_url} alt={ title } />
          <h4 className="movie-title">{ title }</h4>
        </div>

        <div className="flip-card-back">
          <p id="overview-text">{ overview }</p>
          {displayButton}
        </div>
      </div>
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