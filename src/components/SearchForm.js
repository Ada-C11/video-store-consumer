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

    this.props.searchCallback(input);
  }

  render() {
    return (
      <section>
        <label>
          Search <input name="search"
                        type="text"
                        value={this.state.queryString}
                        onChange={this.queryChanged}
                 />
        </label>
        <h3>Searching...</h3>
      </section>
    );
  };
};

SearchForm.propTypes = {
  searchCallback: PropTypes.func.isRequired
}

export default SearchForm;