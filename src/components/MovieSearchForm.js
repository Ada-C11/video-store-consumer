import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MovieSearchForm.css';

class MovieSearchForm extends Component {
    constructor(props) {
        super(props);

        this.cleared = {
            text: "",
        };

        this.state = { ...this.cleared }
    }
    searchMovie = (event) => {
        event.preventDefault();

        const movie = this.state;
        console.log(this.props)

        this.props.searchMovieCallback(movie)

        this.setState({ ...this.cleared });
    }
    onInputChange = (event) => {
        const updatedState = {};

        const field = event.target.name;
        const value = event.target.value;

        updatedState[field] = value;
        this.setState(updatedState);
    }
    render() {
        return (
            <div className="new-card-form">
            <form
                className="new-card-form__form"
                onSubmit={this.searchMovie}
            >
                <h3 className="new-card-form__header">Search for a movie</h3>
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