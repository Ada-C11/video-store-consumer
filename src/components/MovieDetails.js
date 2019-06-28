import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import './MovieDetails.css';

const MovieDetails = (props) => {
  console.log(props)
  const movieDetails = () => {
    return (
      <Card>
        <Card.Body>
          {/* <Card.Title>Title: {props.title}</Card.Title> */}
          <Card.Text>Overview: {props.overview} </Card.Text>
          <li>Id: {props.id}</li>
          {/* <li>Release Date: {props.release_date}</li> */}
          <li>External Id: {props.external_id}</li>
        </Card.Body>
      </Card>
    )
  };

  return movieDetails();
}

MovieDetails.propTypes = {
  external_id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieDetails;