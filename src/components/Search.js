import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchItem from './SearchItem';
import {
    Redirect
} from 'react-router-dom';

const SEARCH_URL = 'http://localhost:3001/movies?query='
const MOVIE_URL = 'http://localhost:3001/movies'


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieSearch: '',
            shouldRedirect: undefined,
            clickSearch: false,
            searchList: [] 
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
                        key={movie.external_id}
                        title={movie.title}
                        overview={movie.overview}
                        releaseDate={movie.release_date}
                        imageURL={movie.image_url}
                        // external_id={movie.external_id}
                        addMovieCallback={this.addMovie}
                    />
                });
                this.setState({searchList: searchList, movieSearch: '', clickSearch: true})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addMovie = (movie) => {
        const movie_params = {
            'title': movie.title,
            'overview': movie.overview,
            'release_date': movie.releaseDate,
            'image_url': movie.imageURL,
            // 'external_id': movie.external_id,
        }

        console.log('in addmovie');
        console.log(movie_params)

        axios.post(MOVIE_URL, movie_params)
            .then((response) => {
                this.setState({
                    shouldRedirect: true,
                })
            })
            .catch((error) => {
                console.log(error);
            })
      }

    render() {

        if(this.state.shouldRedirect) {
            return <Redirect to='/library/' />
        }

        let results = <span></span>

        if (this.state.searchList.length > 0 && this.state.clickSearch) {
            results = this.state.searchList;
        }
        else if (this.state.searchList.length === 0 && this.state.clickSearch) {
            results = <p> No results found </p>;
        }

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
                {results} 
            </div>
        )
    };
}


export default Search