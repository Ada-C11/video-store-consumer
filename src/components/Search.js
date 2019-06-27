import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: undefined,
      searchResults: [],
      notification: null,
    }
  }

  onSearchQueryChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  }

  searchLibrary = (event) => {
    event.preventDefault();
    console.log("this.state.searchQuery", this.state.searchQuery)
    const url = `http://localhost:3000/movies`
    // this is axios request config below
    const config = {
      params: {
        query: this.state.searchQuery
      }
    }
    axios.get(url, config)
      .then((response) => {
        this.setState({ searchResults: response.data });
        console.log(response)
      }) 
      .catch((error) => {
        console.log(error)
        this.setState({ error: error.message });
      });
  }

  addMovie = (movie) => {
    const url = `http://localhost:3000/movies`
    // Only need the image name, not whole URL.
    const image_url_parts = movie.image_url.split("/")
    const image_name = "/" + image_url_parts[image_url_parts.length - 1]
    const data = {
      external_id: movie.external_id,
      image_url: image_name,
      overview: movie.overview,
      release_date: movie.release_date,
      title: movie.title,
    }
    axios.post(url, data)
    .then((response) => {
      console.log(response)
      if (response.status === 200) {
        this.setState({notification: `Succesfully Added ${movie.title}!`})
      }
    })        
    .catch((error) => {
      console.log(error);
    });
    
  }

  render() {
    const searchResults = this.state.searchResults.map((movie, i) => {
      return <Movie
        key={i}
        content={movie}
        selectMovieCallBack={this.addMovie}
      />
    })
    
    const notification = this.state.notification

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Search for Movies to Add!</h1>
          <p className="App__intro-text">
            <div>{notification}</div>
            <form onSubmit={this.searchLibrary}>
              <input
                type="text"
                onChange={this.onSearchQueryChange}
                value={this.state.searchQuery}
              />
              <input type="submit" value="Search" />
            </form>
            <div className="col-md-4 px-0">
              <ul className="movie-list">{searchResults}</ul>
            </div>
          </p>
        </header>
      </div>
    );
  }
}

export default Search;