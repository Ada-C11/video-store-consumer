import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'

import './MovieCard.css';



class MovieCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      numCopies: 0
    };
  }
  

  onSelectButtonClick = () => {
    this.props.selectMovieCallback(this.props);
  }

  render () { 
    const { title, overview, release_date, image_url, inventoryDisplay, buttonDisplay } = this.props;

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image_url} alt={`cover for ${title}`}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{overview}</Card.Text>
          <Card.Text>{release_date}</Card.Text>
          <Card.Text>{inventoryDisplay}</Card.Text>
          <Button onClick={ this.onSelectButtonClick }
            className="select-movie-btn"
            variant='primary'
          >{buttonDisplay}</Button>
        </Card.Body>
      </Card>
    );
  }
};

export default MovieCard;
