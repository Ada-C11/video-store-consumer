import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom"

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
        };
    }

    onSearchChange = (event) => { 
        // event.preventDefault()
        this.setState({
            searchTerm: event.target.value,
        });
    }

    render() {
        return (
            <form action="/search" className="form-inline my-2 my-lg-0">
                <input name="query" value={this.state.searchTerm} onChange={this.onSearchChange} className="form-control mr-sm-2" type="search" placeholder="enter movie title" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">search</button>
            </form>
        )
    }
}

export default withRouter(SearchForm);
