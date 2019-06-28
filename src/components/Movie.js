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
		<ul>
			<section>
					<a href="#" className="text-light title" onClick={this.onSelect}>
						{this.props.content['title']}
					</a>
          <p><a href="#" onClick={this.onSelect}>
					  <img src={this.props.content['image_url']} alt="movie cover" />
          </a></p>
			</section>
		</ul>
	);
  }
}

export default Movie;