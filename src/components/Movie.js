import React from 'react';
import './Movie.css'

const Movie = (props) => {
  const onClickHandler = () => {
    props.selectedCallback(props.movieId);
  }

  return(
    <img className="movie" onClick={onClickHandler} src={props.imgUrl} alt={props.title}></img>
  );
}

export default Movie;