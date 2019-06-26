import React, { Component } from 'react';
import SearchMovie from './SearchMovie'
import './SearchResult.css'

class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMovie: undefined,
			addMovieToLibraryCallback: props.addMovieToLibraryCallback,
		}
	}

	render() {

		const moviesFound = this.props.result.map((movie, i) => {
			return (
					<SearchMovie key={i} movieData={movie} addMovieToLibraryCallback={this.state.addMovieToLibraryCallback}/>
			)
		})
	
		return (
				<table className='search-results'>
					<thead>
						<tr>
							<th scope="row"></th>
						</tr>
					</thead>
					<tbody>
						{moviesFound}
					</tbody>
				</table>
		)
	}
}

export default SearchResult;