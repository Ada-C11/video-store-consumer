import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
import MOVIE_DATA from '../data/movie-data.json';
import axios  from 'axios'
import Message from './Message.js'
import './Search.css'

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            error: null
        }

        props.reportStatusCallback(null);
    }

    reportStatus = (text) => {
        this.props.reportStatusCallback(text);
    }

    addMovieCallback = (movie) => {
        this.setState({message: null})
        this.props.addMovieCallback(movie);
    }

    movieSearchCallback = (title) => {
        this.reportStatus("Searching through database...")

        const getURL = 'http://localhost:3002/'
        axios.get(getURL, {
            params: {
              query: title.title
            }
        })
            .then((response) => {
                console.log(response.data)
                const movies = response.data.map((movie) => {
                    const movieResult = {
                        title: movie.title,
                        overview: movie.overview,
                        image_url: movie.image_url,
                        release_date: movie.release_date,
                        external_id: movie.external_id
                    }
                    return movieResult
                })
                this.setState({ movies });
                this.reportStatus("Search successful!")
            })
            .catch((error) => {
                this.setState({error: error.message });
                this.reportStatus(error.message)
            })
    }

    render() {
        return (
            <div className='search'>
                <SearchForm movieSearchCallback={this.movieSearchCallback} />
                <div className='search-results'>
                    <SearchResults 
                        movieData={this.state.movies} 
                        addMovieCallback={this.addMovieCallback}/>
                </div>
            </div>
        );
    }
}

export default Search

Search.propType = {
    addMovieCallback: PropTypes.func,
    reportStatusCallback: PropTypes.func,
}