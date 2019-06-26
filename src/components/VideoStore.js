import React, { Component } from 'react';
import axios from 'axios';

import Movies from './Movies';
import SearchBar from './SearchBar';

class VideoStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],  
      currentMovie: undefined,
      queryString: ""
    };
  }

  url = "https://enigmatic-chamber-40825.herokuapp.com/"

  componentDidMount() {
    axios.get(this.url)
    .then((response) => {
      console.log(response.data);

      const movieList = response.data.map((movie) => {
        const newMovie = {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          external_id: movie.external_id,
        }
        return newMovie;
      })

      console.log(movieList);

      this.setState({ movieList });
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })
  }

  onMovieSelect = (movieID) => {
    const currentMovie = this.state.movieList.filter(movie => movie.id === movieID)[0]

    console.log(currentMovie)
    this.setState({ currentMovie });
  };

  searchCallback = (queryString) => {
    this.setState({ queryString });
  }
  
  render() {
    return (
      <div>
        <SearchBar searchCallback={this.searchCallback} onChange={this.queryChanged} queryString={this.state.queryString} />
        <Movies movieList={this.state.movieList} currentMovie={this.state.currentMovie} onMovieSelect={this.onMovieSelect} queryString={this.state.queryString} />
      </div>
    )
  }
}

export default VideoStore;