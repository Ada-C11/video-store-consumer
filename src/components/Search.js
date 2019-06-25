import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      queryString: "",
      searchResults: [],
    };
  }

  queryChanged = (event) => {
    const queryString = event.target.value;
    
    this.setState({
      queryString
    })

  }

  onFormSubmit = (event) => {
    event.preventDefault();

    // const URL = `http://localhost:3000/movies?query=${this.state.queryString}`;

    axios.get(`/movies?query=${this.state.queryString}`)
      .then((response) => {
        console.log(response)
        this.setState({
          searchResults: response.data
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const searchResultList = this.state.searchResults.map((movie, index) => {
      return <MovieCard key={index} movie={movie} />
    })
    return (
      <section>
        <h2>Search Page</h2>
        <form onSubmit = {this.onFormSubmit}>
          <div>
            <input
              name="searchResults"
              value = {this.state.queryString}
              onChange = {this.queryChanged}
              type="text" />
          </div>
  
            <div >
              <input type="submit" value="Submit Line" />
            </div>
          </form>
        {searchResultList}
      </section>  
    );
  }

};

export default Search;