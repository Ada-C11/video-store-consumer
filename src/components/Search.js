import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Search.css';


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
            message = <p className="alert alert-danger" role="alert">Your movie has already been added to the Library!</p>
        } else if (this.state.addedMovie === true) {
            message = <p className="alert alert-success" role="alert">Your movie has been added to the Library!</p>
        }
        return message
    }


    displayMovies = (movies) => {
        const searchedMovies = movies.map((movie) => {
            const { title, overview, image_url, release_date, external_id } = movie;
            return (
                <div className="card" key={external_id}>
                    <img src={image_url} alt="movie poster" className="card-img-top" />
                    <ul className="card_data-ul">
                        <li className="card_data-li"><strong>{title}</strong></li>

                        <li className="card_data-li">{release_date}</li>
                        <li className="card_data-li">{overview}</li>
                        <button className="" onClick={() => this.addToLibraryCallback(title, overview, image_url, release_date)}>Add to library</button>
                    </ul>
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
        const hasResultsToShow = this.state.returnedMovies.length !== 0;
        const showSearchResults =
            <div className="content_container">
                <h1 className="green_text">Search Results</h1>
                <div className="card_container">
                    {this.displayMovies(this.state.returnedMovies)}
                </div>
            </div>;
        return (
            <div className="search_page">
                {this.addtoLibraryMessage()}
                <div className="search-movie">
                    <h2 className="search_h2">
                        Find a Movie!
                </h2>
                    <form className="search_form" onSubmit={this.onFormSubmit}>
                        <input type="text" name="title" placeholder="Search by movie title" value={this.state.title} onChange={this.onInputChange} />

                        <button type="submit">Search</button>
                    </form>
                    {hasResultsToShow ? showSearchResults : ""}
                </div>

            </div>
        )
    }




}
Search.propTypes = {
    searchCallback: PropTypes.func
}

export default Search;