import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import MovieItem from './MovieItem'



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
                        imageURL = {movie.image_url}
                    />
                });
                this.setState({ movies: moviesList });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //   addCard = (card) => {
    //     const movie = <Card 
    //       {...card}
    //       key = {card.id}
    //       deleteCardCallback = {this.deleteCard}
    //     />

    //     const movies = [movie, ...this.state.cards]

    //     this.setState({cards: movies});
    //   }


    render() {
        return (
            <div>
                <div className='movie-item-container'>
                    {this.state.movies}
                </div>
            </div>
        )
    }

}

Library.propTypes = {
    url: PropTypes.string.isRequired,
    LibraryName: PropTypes.string.isRequired
};

export default Library;
