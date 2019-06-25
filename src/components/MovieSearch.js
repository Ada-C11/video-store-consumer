import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './MovieSearch.css';

class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      movies: [],
    }
  }

  // TO DO: event handlers
  //  TO DO: add movie to library with axios post
}

export default MovieSearch;
