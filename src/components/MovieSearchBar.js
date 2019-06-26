import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class MovieSearchBar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      query: "",
      clickHandler: this.props.searchCallback,
    }
  }

  onInputChange = (event) => {
    console.log(event.target);
    const updatedState = this.state;

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  };

  submitSearchResults = () => {
    this.state.clickHandler(this.state.query);
  };

 

  render() {

    return (
      <div>
        <h5>Search for a movie with a title</h5>
        <div class="input-group">
          <input className="form-control" type="search" placeholder="Search" name="query" onChange={this.onInputChange} value={this.state.query} />
          <div class="input-group-append">
          <button  className="btn btn-outline-success my-2 my-sm-0" onClick={this.submitSearchResults}>Search</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieSearchBar;