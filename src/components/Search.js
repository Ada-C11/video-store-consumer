import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      queryString: "",
      searchResults: [],
    };
  }

  queryChanged = (event) => {
    const queryString = event.target.value;
    
    this.setState({
      queryString
    })

    // this.props.searchCallback(queryString);
  }

  onFormSubmit = (event) => {
    event.preventDefault()
  }
  // Api calls?

  render() {
    return (
      <section>
        <h2>Search Page</h2>
        <label>
          Search Movie Titles <input name="search"
                        type="text"
                        value={this.state.queryString}
                        onChange={this.queryChanged} />
        </label>
      </section>  
    );
  }

};
export default Search;