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

  onAddButtonClick = () => {
    this.props.selectMovieCallback(this.props, this.state.numCopies);
  }

  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }

  render () { 
    const { title, overview, release_date, inventory, image_url, buttonDisplay, parentComponent } = this.props;

    const inventoryDisplay = {
      'movieLibrary': (
        <div><Card.Text>Inventory: {inventory}</Card.Text>
         <Button onClick={ this.onSelectButtonClick } className="select-movie-btn" variant='primary'>{buttonDisplay}</Button><br/>
        </div>),

      'search': (
        <Card.Text>
          <form 
            className="inventoryNum"
            onSubmit={this.onSearchSubmit}>
            <label>
              Copies to Add: 
              <input
                name="numCopies"
                value={this.state.numCopies}
                onChange={this.onInputChange}
                type="number" min="1" max="10"/>
            </label>
          </form>
          <Button onClick={ this.onAddButtonClick }
            className="select-movie-btn"
            variant='primary'
            >{buttonDisplay}
          </Button>
          </Card.Text>
      )
    } 
    
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image_url} alt={`cover for ${title}`}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{overview}</Card.Text>
          <Card.Text>{release_date}</Card.Text>
          {inventoryDisplay[parentComponent]}
          {/* <Button onClick={ this.onSelectButtonClick }
            className="select-movie-btn"
            variant='primary'
          >{buttonDisplay}</Button> */}
        </Card.Body>
      </Card>
    );
  }
};

export default MovieCard;
