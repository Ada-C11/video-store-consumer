import React, { Component } from 'react';

import Movies from './Movies';
import SearchBar from './SearchBar';

class VideoStore extends Component {
  searchCallback = (queryString) => {
    this.setState({ queryString });
  }
  
  render() {
    return (
      <div>
        <SearchBar searchCallback={this.searchCallback} />
        <Movies queryString={this.props.queryString} />
      </div>
    )
  }
}

export default VideoStore;