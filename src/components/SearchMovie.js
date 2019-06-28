import React, { Component } from 'react';
import './SearchMovie.css'

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
			<tr className="search-result-row">
					<td> 
						<img className="search-result-image" src={this.state.image_url} alt={this.state.title}/>
					</td>
					<td>
						<strong>{this.state.title}</strong>
					</td>
					<td>
					  <button type="button" className="btn btn-primary" onClick={this.addMovieToLibrary}>Add to library</button> 
					</td>
			</tr>
		)
	}

}

export default SearchMovie;