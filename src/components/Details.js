import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './Details.css';
// import './Library.css';

const Details = (props) => {
  const movieDetails = () => {
    return (
      <Card>
        <Card.Img variant="top" class="pic" src={props.image_url} alt={`${props.title}`}/>
        <Card.Body>
          <Card.Title>Title: {props.title}</Card.Title>
          <Card.Text>Overview: {props.overview} </Card.Text>
          <li>Id: {props.id}</li>
          <li>Release Date: {props.release_date}</li>
          <li>External Id: {props.external_id}</li>
        </Card.Body>
      </Card>
    )
  };

  return movieDetails();
}

Details.propTypes = {
  // showMovie: PropTypes.array.isRequired,
};

export default Details;