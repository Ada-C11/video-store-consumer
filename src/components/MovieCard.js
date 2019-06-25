import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieCard.css';



const MovieCard = (props) => {
  const { title, overview, release_date, image_url, inventory, selectMovieCallback } = props;

  const onSelectButtonClick = () => {
    selectMovieCallback(props);
  }

  return (
    <div class="card" style={{width: 18 + 'rem'}}>
      <img class="card-img-top" src={image_url} alt="Card image cap"/>
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{overview}</p>
        <p class="card-text">{release_date}</p>
        <p class="card-text">Inventory: {inventory}</p>
        <button onClick={ onSelectButtonClick }
          className="btn btn-primary select-movie-btn"
        >Select</button>
      </div>
    </div>
  );
};

export default MovieCard;
