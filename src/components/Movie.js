import React from 'react';
import PropTypes from 'prop-types';
import MovieDetails from './MovieDetails';
import './Movie.css';
import Button from 'react-bootstrap/Button'


const Movie = (props) => {
  const onSelectMovie = () => {
    props.onSelectMovieCallback(props.movie.id)
  }

  const onViewMovieDetails = () => {
    props.onClickMovieDetailsCallback(props.movie.id)
  }

  const onDeselectMovie = () => {
    props.onDeselectMovieCallback()
  }

  let movieDescription = <div>
      <h3 className="title">{props.movie.title}</h3>
      <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
      <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
    </div>

  let showButton = <div>
                    <Button variant="outline-info" onClick={onViewMovieDetails}>Show More</Button>
                  </div>
  let selectButton = <div>
                      <Button  className="select_movie-button" onClick={onSelectMovie}>Select Movie</Button>
                    </div>

  if (props.viewMovieDetails) {
    movieDescription = null;
    showButton = <div>
                  <Button variant="outline-info" onClick={onViewMovieDetails}>Show Less</Button>
                </div>
                
  }


  if (props.selectedMovie === props.movie) {
    selectButton = <div>
                      <Button  variant="danger" className="select_movie-button" onClick={onDeselectMovie}>Deselect</Button>
                    </div>
  }

  if (props.deselectedMovie === props.movie) {
    selectButton = <div>
                      <Button  className="select_movie-button" onClick={onSelectMovie}>Select Movie</Button>
                  </div>
  }
  
  return (
    
    <tr>
      <td className="movie_container">
        <img className="movie_image" src={props.movie.image_url} alt={props.movie.title}/>
        <div className="movie_description">
          {movieDescription}
          <div className="description"> 
            {props.viewMovieDetails && <MovieDetails {...props.movie} />}
            <div className="buttons">
                {showButton}
                {selectButton}
            </div>
          </div>
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