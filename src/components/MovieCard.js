import React from 'react';

const MovieCard = (props) => {
  const { title, release_date, overview } = props.movie;
  return (
    <div>
      <h3>{ title }</h3>
      <div>{ release_date }</div>
      <p>{ overview }</p>
      <button type="button" onClick={props.selectMovie(title)}>Select Movie</button>
    </div>
  );
};

export default MovieCard;