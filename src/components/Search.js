import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchQuery: undefined,
      searchResults: []
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

  onAdd = (movie) => {

    console.log(movie)
    const url = `http://localhost:3000/movies`
    const config = {
        external_id: movie.external_id,
        image_url: movie.image_url,
        overview: movie.overview,
        release_date: movie.release_date,
        title: movie.title,
    }
    axios.post(url, config)
    .then((response) => {
      console.log(response)
    }) 
    .catch((error) => {
      console.log(error);
    });
    
  }

  render() {
    const searchResults = this.state.searchResults.map((movie, i) => {
      return <li>{movie.title}<button className="" onClick={() => this.onAdd(movie)}>
      Add</button></li>
    })
    console.log(searchResults)

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Search for Movies to Add!</h1>
          <p className="App__intro-text">
            <form onSubmit={this.searchLibrary}>
              <input
                type="text"
                onChange={this.onSearchQueryChange}
                value={this.state.searchQuery}
              />
              <input type="submit" value="Search" />
            </form>
            <ul>{searchResults}</ul>
          </p>
        </header>
      </div>
    );
  }
}

export default Search;