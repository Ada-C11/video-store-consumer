import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types';

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

    axios.get(`/movies?query=${this.state.queryString}`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          queryString: ''
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const searchResultList = this.state.searchResults.map((movie, i) => {
      return (
        <div>
          <MovieCard key={i} 
            movie={movie}
            selectMovie={() => {this.props.selectMovie(movie)}}
            addMovieCallback={this.props.addMovieCallback}
            filterMoviesCallback={this.props.filterMoviesCallback} />
        </div>
      )
    })
    return (
      <section>
        <h2>Search Page</h2>
        <form onSubmit = {this.onFormSubmit}>
          <div>
            <input name="searchResults" value = {this.state.queryString} onChange = {this.queryChanged} type="text" />
          </div>
  
            <div >
              <input type="submit" value="Search" />
            </div>
          </form>
        {searchResultList}
      </section>  
    );
  }

};

Search.propTypes = {
  addMovieCallback: PropTypes.func.isRequired,
}

export default Search;