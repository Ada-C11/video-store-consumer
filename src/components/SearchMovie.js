import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const URL = process.env.REACT_APP_API_URL
class SearchMovie extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        searchTerm: null,
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
        searchTerm: null,
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
            // Show an error
            console.log(error.messages)
      
            // updating message state
            this.setState({
              message: error.message
            });
          });
    }

    render() {

        const listSearchResults = this.state.allSearchResults.map((movie, i) => {
            return (
                <li key={i}>
                    <img src={movie.image_url} alt={`movie poster for ${movie.title}`}/>
                    <h4>{movie.title}</h4>
                    <p>Release date: {movie.release_date}</p>
                    <p>{movie.overview}</p>
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