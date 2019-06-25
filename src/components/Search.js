import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { nullLiteral } from '@babel/types';


// import './Search.css';


class Search extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            returnedMovies: [],
            errorMessages: null,
        };
    }

    onInputChange = (event) => {
        const updatedState = {};

        const field = event.target.name;
        const value = event.target.value;

        updatedState[field] = value;
        this.setState(updatedState);
    }


    clearForm = () => {
        this.setState({
            title: ""
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        this.searchCallback(this.state.title)
        this.clearForm()
    }

    addToLibraryCallback = () => {


    }



    displayMovies = (movies) => {
        const searchedMovies = movies.map((movie) => {
            const {title, overview, image_url, release_date, external_id} = movie;
            // const title = movie.title
            // const external_id = movie.external_id
            return (
                <div key={external_id}>
                    <img src= {image_url} />
                    <p>{title}</p>
                    <p>{release_date}</p>
                    <p>{overview}</p>
                    <input type="button" value="Add Movie to Library" className="" onClick={this.addToLibraryCallback} />
                </div>

            )
        });
        console.log(searchedMovies)
        return searchedMovies
    }

    searchCallback = (movie) => {
        console.log(movie)
        const fullUrl = "http://localhost:3000/movies?query=" + movie
        console.log(fullUrl)
        axios.get(fullUrl)
          .then((response) => {
            console.log(response)
            this.setState({
                returnedMovies: response.data
              });
              console.log(Object.values(this.state.returnedMovies));
            })
          .catch((error) => {
            this.setState({ errorMessages: error.message });
            console.log(this.state.errorMessages)
          });
    }


    render() {
        return (
            <div className="search-form">
                <div className="search-form__header">
                    Search for a Movie!
                </div>
                <form className="new-card-form__form" onSubmit={this.onFormSubmit}>
                    <div>
                        <input type="text" name="title" value={this.state.title} onChange={this.onInputChange} className="new-search-form__form-input" />
                    </div>
                    <div>
                        <input type="submit" value="Search" className="search-form__form-button" />
                    </div>
                </form>
                <section>
                {this.displayMovies(this.state.returnedMovies)}
                </section>
            </div>
        )
    }




}
Search.propTypes = {
    searchCallback: PropTypes.func
  }
  
  export default Search;