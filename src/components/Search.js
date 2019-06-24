import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSearchButtonCallback: this.props.onSearchButtonCallback,
    }
  }

  onSearchButton = (event) => {
    event.preventDefault()
    console.log(this.state.text)
    this.state.onSearchButtonCallback()

  }


  render() {
    return(
      <div className='SearchBar'>
        <form>
          <div className='SearchInput'>
            <input
            name='search'
            placeholder='Search'>
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
