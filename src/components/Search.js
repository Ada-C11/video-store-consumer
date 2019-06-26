import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import { nullLiteral } from '@babel/types';


// import './Search.css';


class Search extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            returnedMovies: [],
            errorMessages: null,
            addedMovie: null
        };
    }

    onInputChange = (event) => {
        const updatedState = {};

        const field = event.target.name;
        const value = event.target.value;
        updatedState[field] = value;
        this.setState(updatedState);
    }


    clearForm = () => {
        this.setState({
            title: ""
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.searchCallback(this.state.title)
        this.clearForm()
        this.setState({ addedMovie: null })
    }

    addToLibraryCallback = (title, overview, image_url, release_date) => {
        const fullUrl = "http://localhost:3000/movies"
        this.setState({ addedMovie: null })
        axios.get(fullUrl)
            .then((response) => {
                const movies = response.data.map((movie) => {
                    const newMovie = {
                        title: movie.title,
                        id: movie.id,
                    }
                    return newMovie;
                })
                console.log(movies)
                let found = movies.find(movie => movie.title === title);
                console.log(found)
                if (!found) {
                    const newMovie = {
                        title: title,
                        overview: overview,
                        release_date: release_date,
                        inventory: 1,
                        image_url: image_url,
                    }
                    console.log(newMovie)

                    const fullUrl = "http://localhost:3000/movies/"
                    axios.post(fullUrl, newMovie)
                        .then((response) => {
                            console.log(response)
                            this.setState({ addedMovie: true })
                        })
                        .catch((error) => {
                            this.setState({ errorMessages: error.message });
                            console.log(error)
                        });
                } else {
                    console.log("already added!")
                    this.setState({ addedMovie: false })
                }

            })
    }
    
    addtoLibraryMessage = () => {
        let message = ""
        if (this.state.addedMovie === false) {
            message = <p>Your movie has already been added to the library!</p>
        } else if (this.state.addedMovie === true) {
            message = <p>Movie added to the Library!</p>
        }
        return message
    }


    displayMovies = (movies) => {
        const searchedMovies = movies.map((movie) => {
            const { title, overview, image_url, release_date, external_id } = movie;
            return (
                <div key={external_id}>
                    <img src={image_url} alt="movie poster" className="movie-poster" />
                    <p>{title}</p>
                    <p>{release_date}</p>
                    <p>{overview}</p>
                    <input type="button" value="Add Movie to Library" className="" onClick={() => this.addToLibraryCallback(title, overview, image_url, release_date)} />
                </div>

            )
        });
        return searchedMovies
    }

    searchCallback = (movie) => {
        console.log(movie)
        const fullUrl = "http://localhost:3000/movies?query=" + movie
        console.log(fullUrl)
        axios.get(fullUrl)
            .then((response) => {
                console.log(response)
                this.setState({
                    returnedMovies: response.data
                });
                console.log(Object.values(this.state.returnedMovies));
            })
            .catch((error) => {
                this.setState({ errorMessages: error.message });
                console.log(this.state.errorMessages)
            });
    }


    render() {
        return (
            <div className="">
               {this.addtoLibraryMessage()}
                <div className="search-form__header">
                    Search for a Movie!
                </div>
                <form className="new-card-form__form" onSubmit={this.onFormSubmit}>
                    <div>
                        <input type="text" name="title" value={this.state.title} onChange={this.onInputChange} className="new-search-form__form-input" />
                    </div>
                    <div>
                        <input type="submit" value="Search" className="search-form__form-button" />
                    </div>
                </form>
                <section className="">
                    {this.displayMovies(this.state.returnedMovies)}
                </section>
            </div>
        )
    }




}
Search.propTypes = {
    searchCallback: PropTypes.func
}

export default Search;