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
    <div className="card" style={{width: 18 + 'rem'}}>
      <img className="card-img-top" src={image_url} alt={`cover for ${title}`}/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{overview}</p>
        <p className="card-text">{release_date}</p>
        <p className="card-text">Inventory: {inventory}</p>
        <button onClick={ onSelectButtonClick }
          className="btn btn-primary select-movie-btn"
        >Select</button>
      </div>
    </div>
  );
};

export default MovieCard;
