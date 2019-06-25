import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
import MOVIE_DATA from '../data/movie-data.json';

class Search extends Component {
    constructor() {
        super();

        this.state = {
            movies: MOVIE_DATA,
        }

    }

    render() {
        return (
            <div>
                <SearchForm />
                <SearchResults movieData={this.state.movies} />
            </div>
        );
    }
}

export default Search