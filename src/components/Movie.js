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
				<li>
					<a href="#" className="text-light" onClick={this.onSelect}>
						{this.props.content['title']}
					</a>
				</li>
				<li>
          <a href="#" onClick={this.onSelect}>
					  <img src={this.props.content['image_url']} alt="movie cover" />
          </a>
				</li>
			</section>
		</ul>
	);
  }
}

export default Movie;