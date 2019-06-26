import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import './Library.css';

const Details = (props) => {
  const movieDetails = () => {
    return (
      <ul>
        <li>Id: {props.id}</li>
        <li>Title: {props.title}</li>
        <li>Overview: {props.overview} </li>
        <li>Release Date: {props.release_date}</li>
        <li><img src={props.image_url} alt={`${props.title}`}/></li>
        <li>External Id: {props.external_id}</li>
      </ul>
    )
  };

  return movieDetails();
}

Details.propTypes = {
  // showMovie: PropTypes.array.isRequired,
};

export default Details;