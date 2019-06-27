import React from 'react';
import PropTypes from 'prop-types';
import Details from './Details';
import './Movie.css';
import Button from 'react-bootstrap/Button'


const Movie = (props) => {
  const onClickButton = () => {
    props.onSelectMovieCallback(props.movie.id)
  }

  
  const onClickDetailsButton = () => {
    props.onClickDetailsCallback(props.movie.id);
  }

  let movieDescription = <div>
      <h3 className="title">{props.movie.title}</h3>
      <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
      <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
    </div>

  let buttons = <div className="buttons">
                  <div>
                    <Button variant="outline-info" onClick={onClickDetailsButton}>Show More</Button>
                  </div>
                  <div>
                    <Button className="select_movie-button" onClick={onClickButton}>Select Movie</Button>
                  </div>
                </div>

  if (props.viewMovieDetails) {
    movieDescription = null;
    buttons = <div className="buttons">
                <div>
                  <Button variant="outline-info" onClick={onClickDetailsButton}>Show Less</Button>
                </div>
                <div>
                  <Button  className="select_movie-button" onClick={onClickButton}>Select Movie</Button>
                </div>
              </div>
  }
  
  return (
    
    <tr>
      <td className="movie_container">
        <img className="movie_image" src={props.movie.image_url} alt={props.movie.title}/>
        <div className="movie_description">
          {movieDescription}
          <div className="description"> 
            {props.viewMovieDetails && <Details {...props.movie} />}
            {buttons}
          </div>
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