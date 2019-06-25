import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


// import './Search.css';


class Search extends Component {
    constructor() {
        super();

        this.state = {
            title: ""
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

        this.props.searchCallback(this.state.title)
        this.clearForm()
    }

    render() {
        return (
            <div className="search-form">
                <div className="search-form__header">
                    Write a Inspirational Card!
                </div>
                <form className="new-card-form__form" onSubmit={this.onFormSubmit}>
                    <div>
                        <textarea name="text" value={this.state.text} type="text" onChange={this.onInputChange} className="new-card-form__form-textarea" />
                    </div>
                    <div>
                        <select className="new-card-form__form-select" onChange={this.onInputChange} name="emoji" value={this.state.emoji}  >
                            {this.emojiOptions(EMOJI_LIST)}
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Submit Card" className="new-card-form__form-button" />
                    </div>
                </form>
            </div>
        )
    }




}
Search.propTypes = {
    searchCallback: PropTypes.func
  }
  
