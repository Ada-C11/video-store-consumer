import React, { Component } from 'react';

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
            name='search'
            placeholder='Search'
            value={this.state.searchInput}
            onChange={this.onSearchInputChange}>
            </input>
          </div>

          <div className='search-submission-form__submit'>
            <input type='submit' value='Search' onClick={this.onSearchButton}>
            </input>
          </div>

        </form>
      </div>
    )

  }
}

export default Search;
