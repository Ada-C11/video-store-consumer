import React, { Component } from 'react';
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
  // const movieDetails = <Details {...props.movie}/>;
  // const movieDetails = <Details viewMovieDetails= {props.viewMovieDetails}/>;

  // const movie = (<td className="movie_container">
  //         <img src={props.movie.image_url} alt={props.movie.title}/>
  //         <div className="movie_description">
  //         <h3 className="title">{props.movie.title}</h3>
  //         <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
  //         <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
  //         <button onClick={onClickDetailsButton}>View Details</button>
  //         <button onClick={onClickButton}>Select Movie</button>
  //         </div>
  //               </td>)
  
  // let movieToShow;
  // if (props.isDetailsClicked) {
  //   movieToShow = movieDetails;
  // } else {
  //   movieToShow = movie;
  // }

  let movieDescription = <div>
      <h3 className="title">{props.movie.title}</h3>
      <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
      <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
      {/* <button onClick={onClickDetailsButton}>View Details</button>
      <button onClick={onClickButton}>Select Movie</button>     */}
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
      {/* <button onClick={onClickDetailsButton}>View Details</button>
      <button onClick={onClickButton}>Select Movie</button> */}
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
        {/* {movie} */}
        {/* {props.viewMovieDetails && <Details {...props.movie} />} */}
        {/* {movieToShow} */}
        {/* <button onClick={onClickDetailsButton}>View Details</button>
        <button onClick={onClickButton}>Select Movie</button> */}
        {/* {movieDetails} */}
      <td className="movie_container">
        <img className="movie_image" src={props.movie.image_url} alt={props.movie.title}/>
        <div className="movie_description">
          {movieDescription}
          {/* <div>
            <h3 className="title">{props.movie.title}</h3>
            <p><span className="bold_words">Release Date: </span>{props.movie.release_date}</p>
            <p><span className="bold_words">Overview: </span>{props.movie.overview.length > 128 ? `${props.movie.overview.substring(0, 150)}...` : props.movie.overview}</p>
          </div> */}
          {/* <button onClick={onClickDetailsButton}>View Details</button>
          <button onClick={onClickButton}>Select Movie</button> */}
          <div className="description"> 
            {props.viewMovieDetails && <Details {...props.movie} />}
            {/* <div className="buttons">
              <button onClick={onClickDetailsButton}>View Details</button>
              <button onClick={onClickButton}>Select Movie</button>
            </div> */}
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