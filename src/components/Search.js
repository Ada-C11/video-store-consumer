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
    console.log(this.state.text)
    this.state.onSearchButtonCallback(this.state.searchInput)
  }

  onSearchInputChange = (event) => {
    let searchInput = event.target.value
    this.setState({
      searchInput,
      })

  }

  


  render() {
    return(
      <div className='SearchBar'>
        <form>
          <div className='SearchInput'>
            <input
            name='search'
            placeholder='Search'
            value={this.state.searchInput}
            onChange={this.onSearchInputChange}>
            </input>
          </div>

          <div className='SearchSubmissionForm__submit'>
            <input type='submit' value='Search' onClick={this.onSearchButton}>
            </input>
          </div>

        </form>
      </div>
    )

  }
}

export default Search;
