import React from 'react';
// import './Home.css';

function Movie (props) {
  const onTitleClick = () => {
    props.addMovieToRentCallback(props.title)
  }

  return <p onClick={onTitleClick}>{props.title}</p>
}

export default Movie;