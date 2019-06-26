import React, { Component } from 'react';

class SearchMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: props.movieData.title,
			overview: props.movieData.overview,
			release_date: props.movieData.release_date,
			image_url: props.movieData.image_url,
			external_id: props.movieData.external_id,
			addMovieToLibraryCallback: props.addMovieToLibraryCallback,
		}
	}

	addMovieToLibrary = () => {
		this.props.addMovieToLibraryCallback(this.state)
	}

	render(){
		return(
			<div className='movie-search-result'>
				<ul>
					<li>
						{this.state.title}
					</li>
					<li>
						<img src={this.state.image_url} alt={this.state.title}/>
					</li>
					<li>
						<button onClick={this.addMovieToLibrary}>Add to library</button>
					</li>
				</ul>
			</div>
		)
	}

}

export default SearchMovie;