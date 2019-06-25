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
    const endpoint = 'http://localhost:3000/movies?query=' + title
  
    axios.get(endpoint)
      .then((response) => {
        const newSearchResults = response.data.map((movie) => {
          
          const newMovie = { 
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            external_id: movie.external_id,
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