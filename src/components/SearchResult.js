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

	displaySearchResults = () => {
		console.log(this.props.result)
		if (this.props.result !== undefined){
			const moviesFound = this.props.result.map((movie, i) => {
				return (
						<SearchMovie key={i} movieData={movie} addMovieToLibraryCallback={this.state.addMovieToLibraryCallback}/>
				)
			})
		
			return (
				<table className="table search-results">

					<thead>
						<tr>
							<th colSpan="3" className="search-result-title"> Search Results </th>
						</tr>
					</thead>
					<tbody>
						{moviesFound}
					</tbody>
				</table>
			)
		}
	}

	render() {
		return (
			<section>
        		{this.displaySearchResults()}
      </section>
		)

		
	}
	
}

export default SearchResult;