import React, { Component } from 'react';
import axios from 'axios';

import Movies from './Movies';
import SearchBar from './SearchBar';
import SearchMatches from './SearchMatches';

class VideoStore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],  
      currentMovie: undefined,
      queryString: "",
      searchMatches: [],
    };
  }

  url = "http://localhost:3000/"

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
    const searchURL = this.url+`movies?query=`+queryString
    axios.get(searchURL)
    .then((response) => {
      console.log(response.data)

      const searchMatches = response.data.map((movie) => {
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

      console.log(searchMatches);

      this.setState({ searchMatches });
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })
    
    this.setState({ queryString });
  }

  onMovieAdd = (movieID) => {
    const movieToAdd = this.state.searchMatches.find(movie => movie.id === movieID);
    const titleOfMovieToAdd = movieToAdd.title
    const url = `${this.url}movies/${titleOfMovieToAdd}`;

    console.log(`Sending POST to ${url} with payload`, titleOfMovieToAdd);

    axios.post(url, titleOfMovieToAdd)
    .then((response) => {
      const newMovie = response.data[0];
      newMovie.id = response.data[0].id;

      const newMovieList = [newMovie, ...this.state.movieList];

      this.setState({ movieList: newMovieList });
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })
  };
  
  render() {
    return (
      <div>
        <SearchBar
          searchCallback={this.searchCallback}
          onChange={this.queryChanged}
          queryString={this.state.queryString} 
          />
        <Movies
          movieList={this.state.movieList}
          currentMovie={this.state.currentMovie}
          onMovieSelect={this.onMovieSelect}
          queryString={this.state.queryString}
          />
        <SearchMatches
          searchMatches={this.state.searchMatches}
          onMovieAdd={this.onMovieAdd}
          />
      </div>
    )
  }
}

export default VideoStore;