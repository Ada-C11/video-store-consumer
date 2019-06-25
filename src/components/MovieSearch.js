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

  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
 }

  onFormSubmit = (event) => {
    event.preventDefault();

    const searchQuery = {
      title: this.state.title,
    };

    this.setState({
      title: '',
  });

  const url = `http://localhost:3000/movies?query=${searchQuery.title}`
  axios.get(url)
    .then((response) => {
      console.log(searchQuery);
      console.log(url);
      console.log(response.data);
      this.setState({movies: response.data})
    })
    .catch((error) => {
      console.log(error);
      this.setState({error: error.message})
    });
 }

  // TO DO: event handlers
  //  TO DO: add movie to library with axios post
}

export default MovieSearch;
