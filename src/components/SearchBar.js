import React from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';

const SearchBar = (props) => {
  const queryChanged = (event) => {
    const queryString = event.target.value;
    console.log(queryString)

    props.searchCallback(queryString);
  }

  return(
    <section>
      <label>
        Search <input name="search"
                      type="text"
                      value={props.queryString}
                      onChange={queryChanged}
                      className="search-bar"
                      />
      </label>
    </section>
  )
}

SearchBar.propTypes = {
  searchCallback: PropTypes.func.isRequired
}

export default SearchBar;