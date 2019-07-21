import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';
import PropTypes from 'prop-types';
import './SearchMovie.css';

const URL = process.env.REACT_APP_API_URL
class SearchMovie extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        searchTerm: '',
        allSearchResults: [],
        message: '',
      };
    };
  
    onChangeHandler = (event) => {
        const searchTerm = event.target.value
        this.setState({
            searchTerm
        });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      
      this.onSearch(this.state.searchTerm);
  
      this.setState({
        searchTerm: '',
        allSearchResults: [],
      });
    };

    onSearch = (searchTerm) => {
  
        this.setState({searchTerm})

        axios.get(`${URL}/movies?query=<${searchTerm}>`)
          .then((response) => {

            response.data.map((foundMovie) => {
              let allResults = this.state.allSearchResults;
              allResults.push(foundMovie);

              return this.setState({allSearchResults: allResults})
            })
          })
          .catch((error) => {
            console.log(error.messages)
      
            // not displaying this message
            this.setState({
              message: error.message
            });
          });

      setTimeout(this.clearMessage, 5000);
    }

    clearMessage = () => {

      this.setState({
        message: '',
      })
    };

    render() {
        const { message, allSearchResults, searchTerm } = this.state
        const { movieList, addSearchToLibraryCallback } = this.props
        
        const listSearchResults = allSearchResults.map((movieFromSearch, i) => {
        let alreadyInLibrary = false

          movieList.forEach((movie) => {
            if (movie.external_id === movieFromSearch.external_id) {
              alreadyInLibrary = true;
            }
          })

          return (
            <li key={i}>
              <Movie 
                movie={movieFromSearch} 
                addSearchToLibraryCallback={addSearchToLibraryCallback} 
                isSearchResult={true} 
                alreadyInLibrary={alreadyInLibrary}
              />
            </li>
          )
        })

    
  
        return (
          <div>

            <section className={ message === '' ? 'no-message' : 'alert alert-dark'}>
              {message}
            </section>

            <div className='search-movie-form'>
              <h3>Search by Movie Title:</h3>
      
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                  id="movie-search-area"
                  className='form-control'
                  name='text'
                  value={searchTerm}
                  placeholder='Ex: "Clueless"'
                  type='text'
                  onChange={this.onChangeHandler} 
                  />
                </div>   
                <div>
                  <input className="btn btn-dark" type="submit" value="Find Movie" />
                </div>
              </form>
            </div>

            <section className="search-results">
                {allSearchResults.length !== 0 && <ul className='search-movie-list'>{listSearchResults}</ul>}
                {allSearchResults.length === 0 && <p>Loading Results...</p>}
            </section>
        </div>
      );
    };
};

SearchMovie.propTypes = {
  movieList: PropTypes.array.isRequired, 
  addSearchToLibraryCallback: PropTypes.func,
};

export default SearchMovie;
