import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './MovieSearchForm.css';

class MovieSearchForm extends Component {
    constructor(props) {
        super(props);

        this.cleared = {
            text: "",
            // movies: [],
            hasmovies: false
        };

        this.state = { ...this.cleared }
    }
    searchMovie = (event) => {
        event.preventDefault();
            const URL = `https://api.themoviedb.org/3/search/movie?api_key=bb031365ec3e7cc087920804b23e74b1&language=en-US&page=1&query=${this.state.text}&include_adult=false`
            axios.get(URL)
              .then((response) => {
                  console.log(response)
                  const movies = response.data["results"]
                // const movies = response.data["results"].map((movie) => {
                //   const newMovie = {
                //     title: movie["title"]
                //   }
                //   return newMovie
                // })
                console.log(response.data["results"])
                // this.setState({
                //   movies: movies,
                //   hasmovies: true
                // });
                this.props.getresultcallback(movies)

                // console.log(this.state.movies)
              })
              .catch((error) => {
                console.log(error);
                alert('Error happened');
                this.setState({ error: error.message });
              });

        const movie = this.state;
        console.log(this.props)
        this.setState({ movies: movie });
    }
    onInputChange = (event) => {
        const updatedState = {};

        const field = event.target.name;
        const value = event.target.value;

        updatedState[field] = value;
        this.setState(updatedState);
    }
    render() {
        // const moviecollection = this.state.movies.map((movie) => {
        //     return(
        //     <section>
        //     <span> {movie} </span>

        //     <button
        //       type="button"
        //       className="btn btn-danger"
        //       aria-label="Close"
        //     >
        //       ADD
        //     </button>
        //   </section>
        //   )
        // })
        return (
            <div className="new-card-form">
            <form
                className="new-card-form__form"
                onSubmit={this.searchMovie}
            >
                <h2 className="new-card-form__header">Search for a movie</h2>
                <label >
                    Text:
                    <input
           
                        name="text"
                        type="text"
                        value={this.state.text}
                        onChange={this.onInputChange}></input>
                </label>
                <input className="btn btn-success" type="submit" name="submit" value="Search" />
            </form>
            </div>
        );
    }


}
// MovieSearchForm.propTypes = {
//     // addCardCallback: PropTypes.func.isRequired,
// };

export default MovieSearchForm;