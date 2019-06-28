import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: '',
    }
  }

  queryChanged = (event) => {
    const input = event.target.value;

    this.setState({
      queryString: input,
    });

  }

  onSubmit = (event) => {
    console.log("in prevent default")
    event.preventDefault();
    if (this.state.queryString) {
      this.props.searchCallback(this.state.queryString);
    }
    this.setState({ queryString: '' })
  }

  render() {
    return (
      <section>
        <form onSubmit={this.onSubmit}>
          <input name="search"
            type="text"
            value={this.state.queryString}
            onChange={this.queryChanged}
            placeholder="Type in a Movie Title"
          />
          <br /><br />
          <button 
            type="submit" 
            name="submit" 
            value="search"
            className="button"
          >Search</button>
        </form>
      </section>
    );
  };
};

SearchForm.propTypes = {
  searchCallback: PropTypes.func.isRequired
}

export default SearchForm;