import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie';
// import axios from 'axios';
// import './Library.css';

const Library = (props) => {
  const movieCollection = props.library.map((movie, i) => {
    return <li key={i}><Movie id={movie.id} title={movie.title} onSelectCallback={props.onSelectCallback}/></li>
   });

  return (
    <div>
      <h2>Library</h2>
      <ul>{movieCollection}</ul>
    </div>
  )
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
};

export default Library;