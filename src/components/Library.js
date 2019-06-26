import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MovieItem from './MovieItem'
import './Library.css'



const MOVIE_URL = 'http://localhost:3001/movies'


class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
        };

    }

    componentDidMount() {
        axios.get(MOVIE_URL)
            .then((response) => {
                const moviesList = response.data.map((movie) => {

                    return <MovieItem
                        key={movie.id}
                        title={movie.title}
                        overview={movie.overview}
                        id={movie.id}
                        releaseDate={movie.release_date}
                        imageURL={movie.image_url}
                        onSelectMovieCallback={this.props.onSelectMovieCallback}
                    />
                });
                this.setState({ movies: moviesList });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className='movie-item-container'>
                {this.state.movies}
            </div>
        )
    }

}

Library.propTypes = {
    onSelectMovieCallback: PropTypes.func.isRequired,
};

export default Library;
