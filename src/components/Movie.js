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
      <ul><section>
        <li><a href="#" onClick={this.onSelect}>{this.props.content["title"]}</a></li>
        <li><img src={this.props.content["image_url"]} alt={this.props.content["title"]}></img></li>
        
        </section></ul>
    );
  }
}

export default Movie;