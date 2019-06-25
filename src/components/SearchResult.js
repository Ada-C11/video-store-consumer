import React, { Component } from 'react';

class SearchResult extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMovie: undefined,
		}
	}

	

	render() {


		const moviesFound = this.props.result.map((movie) => {
			return (
				<li>
					<p>{movie.title}</p>
					<button>Add to Library</button>
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