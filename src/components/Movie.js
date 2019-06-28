import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './movie.css';


const Movie = (props) => {

const onSelectMovie = () => {
   console.log("movie element" + props.title);
    props.movieTitleCallbackinMovie(props.title)
}


const onAddMovie = ()=> {
  axios.post('http://localhost:3000/movies/',{
      title: props.title,
      overview : props.overview,
      release_date: props.release_date,
      inventory: 10,
      image_url: props.image_url,
      external_id: props.external_id
  })   
  .then((response) => {
   alert("Movie Added to Rental Library");
  })
  .catch((error) => {
    this.setState({ error: error.message });
  });
}

if (props.addMovie == true ){
  return (
    <div className="movie">
        <span className="movie__content">
          <div className="movie__content-title">{props.title}</div>
          <div className="movie__content-overview">{props.overview}</div>
          <div className="movie__content-release_date">{props.release_date}</div>
          <div className="movie__content-image_url"><img src={props.image_url} alt="new"/></div>
        </span>

        <button onClick={onAddMovie}
        className="select__movie">
          Add Movie 
        </button>
      </div>
)
}
else {
  return (
    <div className="movie">
        <span className="movie__content">
          <div className="movie__content-title">{props.title}</div>
          <div className="movie__content-overview">{props.overview}</div>
          <div className="movie__content-release_date">{props.release_date}</div>
          <div className="movie__content-image_url"><img src={props.image_url} alt="new"/></div>
        </span>

        <button onClick={onSelectMovie}
        className="select__movie">
          Select 
        </button>
      </div>

    )
  }
}    
Movie.propTypes = {
    id:PropTypes.number,
    title:PropTypes.string,
    overview:PropTypes.string,
    release_date:PropTypes.string,
    image_url:PropTypes.string,
    external_id:PropTypes.number,
    movieTitleCallbackinMovie: PropTypes.func,
    
  };
  
  export default Movie;