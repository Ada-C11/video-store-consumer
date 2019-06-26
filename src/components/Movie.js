import React, { Component } from 'react';


class Movie extends Component {
  constructor() {
    super();
  }

  onSelect = () => {
    this.props.selectMovieCallBack(this.props.content)
  }


  render() {
    return (
      <li onClick={this.onSelect}>{this.props.content["title"]}</li>
    );
  }
}

export default Movie;