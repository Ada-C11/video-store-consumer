import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchItem from './SearchItem';

const SEARCH_URL = 'localhost:3001/movies?query='

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieSearch: ''
        }
    }

    onInputChange = (event) => {
        const updatedState = {};

        const field = event.target.name;
        const value = event.target.value;

        updatedState[field] = value;
        this.setState(updatedState);
    }

    submitSearch = (event) => {
        event.preventDefault()
        axios.get(SEARCH_URL + this.state.movieSearch)
            .then((response) => {
                const searchList = response.data.map((movie) => {
                    return <SearchItem
                        key={movie.id}
                        title={movie.title}
                        overview={movie.overview}
                        id={movie.id}
                        releaseDate={movie.release_date}
                        imageURL={movie.image_url}
                        // AddMovieCallback={this.props.AddMovieCallback}
                    />
                });
                this.setState({searchList: searchList})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <div>
                <form className='movie-item'
                    onSubmit={this.submitSearch}>
                    <label>
                        Search
                <input
                            name='movieSearch'
                            value={this.state.movieSearch}
                            type='text'
                            onChange={this.onInputChange}>
                        </input>
                    </label>
                    <button className="search-submit"> Search</button>
                </form >

                {this.state.searchList}
            </div>
        )
    };
}


export default Search