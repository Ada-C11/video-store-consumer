import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryString: ""
    };
  }

  queryChanged = (event) => {
    const queryString = event.target.value;
    console.log(queryString)

    this.setState({ queryString })
    this.props.searchCallback(queryString);
  }

  render() {
    return(
      <section>
        <label>
          Seach <input name="search"
                        type="text"
                        value={this.state.queryString}
                        onChange={this.queryChanged}
                        className="search-bar"
                        />
        </label>
      </section>
    )
  }
}

SearchBar.propTypes = {
  searchCallback: PropTypes.func.isRequired
}

export default SearchBar;