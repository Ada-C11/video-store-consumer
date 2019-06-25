import React from 'react';

const MovieCard = (props) => {
  const { title, release_date, overview } = props
  return (
    <div>
      <h3>{ title }</h3>
      <div>{ release_date }</div>
      <p>{ overview }</p>
    </div>
  );
};

export default MovieCard;