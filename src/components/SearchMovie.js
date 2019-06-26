import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';
import PropTypes from 'prop-types';

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
        console.log('this is what i searched: ', searchTerm)
        this.setState({searchTerm})

        axios.get(`${URL}/movies?query=<${searchTerm}>`)
          .then((response) => {

            console.log(response.data[0])
            response.data.map((foundMovie, i) => {
              let allResults = this.state.allSearchResults;
              allResults.push(foundMovie);

              this.setState({allSearchResults: allResults})
            })
          })
          .catch((error) => {
            console.log(error.messages)
      
            this.setState({
              message: error.message
            });
          });
    }

    getMovieForLibrary = () => {
      console.log("i clicked 'add movie to library'!")
    }

    render() {
        
        const listSearchResults = this.state.allSearchResults.map((movieFromSearch, i) => {
        let alreadyInLibrary = false

          this.props.movieList.forEach((movie) => {
            if (movie.external_id === movieFromSearch.external_id) {
              alreadyInLibrary = true;
            }
          })

          return (
            <li key={i}>
              <Movie movie={movieFromSearch} addSearchToLibraryCallback={this.props.addSearchToLibraryCallback} isSearchResult={true} alreadyInLibrary={alreadyInLibrary}/>
            </li>
          )
        })
  
        return (
          <div>
            <div className='search-movie-form'>
                <h3>Search by Movie Title:</h3>
        
                <form onSubmit={this.handleSubmit}>
                
                        <input
                        className='movie-search-area'
                        name='text'
                        value={this.state.searchTerm}
                        placeholder='Ex: "Clueless"'
                        type='text'
                        onChange={this.onChangeHandler} 
                        />
                        
                    <div>
                        <input type="submit" value="Find Movie" />
                    </div>
                </form>
            </div>

            <section className="search-results">
                {this.state.allSearchResults.length !== 0 && <ul>{listSearchResults}</ul>}
            </section>
        </div>
      );
    };
};

export default SearchMovie;
