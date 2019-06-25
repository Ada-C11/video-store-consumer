import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'

import './MovieCard.css';



const MovieCard = (props) => {
  const { title, overview, release_date, image_url, inventory, selectMovieCallback } = props;

  const onSelectButtonClick = () => {
    selectMovieCallback(props);
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image_url} alt={`cover for ${title}`}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{overview}</Card.Text>
        <Card.Text>{release_date}</Card.Text>
        <Card.Text>Inventory: {inventory}</Card.Text>
        <Button onClick={ onSelectButtonClick }
          className="select-movie-btn"
          variant='primary'
        >Select</Button>
      </Card.Body>
      </Card>
  );
};

export default MovieCard;
