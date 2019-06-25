import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieSearch: ''
        }
    }


    render() {
        
        return (
            <div>
            <form className='movie-item'>
                Search 
                <input
                name = 'movieSearch'
                value = {this.state.movieSearch}
                type = 'text'> 
                </input>
                <button className="search-submit"> Search</button>
            </form >
            </div>
        )
    };
}


export default Search