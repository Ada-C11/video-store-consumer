import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchResults from './SearchResults';
import SearchForm from './SearchForm';
import MOVIE_DATA from '../data/movie-data.json';
import axios  from 'axios'
import Message from './Message.js'

class Search extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            error: null
        }

    }

    reportStatus = (text) => {
        this.setState({message: text})
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
            <div>
                
                <Message message={this.state.message} />
                <SearchForm movieSearchCallback={this.movieSearchCallback} />
                <SearchResults movieData={this.state.movies} />
            </div>
        );
    }
}

export default Search