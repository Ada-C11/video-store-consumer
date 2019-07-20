import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

class Library extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            errorMessage: null,
        }
    }

    componentDidMount() {
        const moviesURL = 'http://localhost:3001/movies';
        axios.get(moviesURL)
            .then((response) => {
                const movies = response.data.map((movieInfo) => {
                    return {
                      id: movieInfo.id,
                      title: movieInfo.title,
                      overview: movieInfo.overview,
                      release_date: movieInfo.release_date,
                      image_url: movieInfo.image_url,
                      extrenal_id: movieInfo.extrenal_id,
                    }
                })
                this.setState({
                    movies: movies,
                });
            })
            .catch((error) => {
               console.log(error.message)
            });
    }

    handleMovieSelection = movie => {
        this.props.selectedMovieCallback(
            movie.title
        );
    }


    render() {
       const eachMovie = this.state.movies.map((movie, i) => {
           return (
           <div className="movie_card" key={i}>
            <ul>
            <img src={movie.image_url} alt="movie poster" className="movie_IMG" />

                <li id="title" className="movie_info">{movie.title} </li>
                <li>Released: {movie.release_date}</li>
                <button className="most_btns" onClick={()=>this.handleMovieSelection(movie)}> Select Movie </button>
            </ul>
           </div>
            )

       })

        // const errors = this.state.error;

        return (
            <section>
                <h1>All Movies</h1>
            <div className="movie_container">
                {eachMovie}
            </div>
            </section>
        )
    }

}
export default Library;
