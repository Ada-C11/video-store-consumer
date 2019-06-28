import React, { Component } from 'react';
import './Search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      onSearchButtonCallback: this.props.onSearchButtonCallback,
    }
  }

  onSearchButton = (event) => {
    event.preventDefault()
    this.state.onSearchButtonCallback(this.state.searchInput)
    this.setState({
      searchInput: '',
    })
  }

  onSearchInputChange = (event) => {
    let searchInput = event.target.value
    this.setState({
      searchInput,
      })
  }

  render() {
    return(
      <div className='search-bar'>
        <form>
          <div className='search-input'>
            <input
            type="search"
            className="form-control mr-sm-2"
            name='search'
            placeholder='Search'
            value={this.state.searchInput}
            onChange={this.onSearchInputChange}>
            </input>
          </div>

          <div className='search-submission-form__submit'>
            <button className="btn btn-primary" type='button' onClick={this.onSearchButton}>
              Search
            </button>
          </div>
        </form>
      </div>
    )

  }
}

export default Search;
