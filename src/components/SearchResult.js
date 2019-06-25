import React, { Component } from 'react';
import SearchMovie from './SearchMovie'

class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMovie: undefined,
			addMovieToLibraryCallback: props.addMovieToLibraryCallback,
		}
	}

	render() {

		const moviesFound = this.props.result.map((movie) => {
			return (
				<li>
					<SearchMovie movieData={movie} addMovieToLibraryCallback={this.state.addMovieToLibraryCallback}/>
				</li>
			)
		})
	
		return (
			<div className='search-results'>
				<ul>
					{moviesFound}
				</ul>
			</div>
		)
	}
}

export default SearchResult;