import React from 'react';
import propTypes from 'prop-types';


const Movie = (props) => {
  const { index, title, overview, release_date, image_url, isSelectButton } = props;

  // Flesh this out!
  const decisionThing = isSelectButton ? <button>This is Coming From Library!</button> : <button>This is Coming from Search!</button>;
  

  return (
    <div>
      <h3>{title}</h3>
      <ul>
        <li><img src={image_url} /></li>
        <li>{release_date}</li>
        <li>{overview}</li>
      </ul>
      { decisionThing }
    </div>
  )
}

export default Movie;