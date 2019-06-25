import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import MovieCard from './MovieCard'

import './Search.css';
class Search extends Component {
  constructor(props) {
    super(props);

    this.cleared = {
      title: "",
      searchResults: []
    };

    this.state = { ...this.cleared }
  }
  
  onSearchSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    console.log(title)

    this.onSearch(title)

    this.setState({ ...this.cleared });
  }

   onSearch = (title) => {
    const API_KEY = process.env.REACT_APP_API_KEY
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w185'

    const endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
  
    axios.get(endpoint)

      .then((response) => {
        const newSearchResults = response.data.results.map((movie) => {
          
          const newMovie = { 
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: IMAGE_URL + movie.poster_path,
            external_id: movie.id,
            inventory: movie.inventory
          }
          
          return newMovie
        })
  
        this.setState({searchResults: newSearchResults});
        console.log(response.data);
      })
  
      .catch((error) => {
        console.log(error);
      })
  }

  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }

  render() {
    const display = this.state.searchResults.map((movie) => {
      const { id, title, overview, release_date, image_url, external_id, inventory } = movie;
      return (<section>
        <MovieCard 
          id={id}
          title={title}
          overview={overview}
          release_date={release_date}
          image_url={image_url}
          external_id={external_id}
          inventory={inventory}
          selectMovieCallback={this.selectMovie}
        />
      </section>);
    });

    return (
      <div>
        <section><form 
          className="search"
          onSubmit={this.onSearchSubmit}
        >
          <h3 >Search for a Movie</h3>
          <label>
            Title:
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.onInputChange}></input>
          </label>
          <input type="submit" name="submit" value="Find Movie" />
        </form></section>
        {display}
      </div>
    );
  }
}

export default Search;


// /movies?query=<search term>