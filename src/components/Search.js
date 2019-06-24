import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';

class Search extends Component {
    constructor() {
        super();

        this.state = {
            searchResults: [],
        }
    }

    render() {
        return (
            <SearchResults />
        );
    }
}

export default Search