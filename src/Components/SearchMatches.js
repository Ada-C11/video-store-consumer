import React, { Component } from 'react';

import Movie from './Movie';

class SearchMatches extends Component {

  render() {
    const displayMovies = this.props.searchMatches.flatMap(
      ({ id, title, overview, release_date, image_url, external_id }) => {
        // Construct a RegExp object with 'i' so that the match is case
        // insensitive.
        const query = new RegExp(this.props.queryString, 'i');
  
        if (title.match(query)) {
          return [<Movie
                    key = {id}
                    id = {id}
                    title = {title}
                    overview = {overview}
                    release_date = {release_date}
                    image_url = {image_url}
                    external_id = {external_id}
                    onMovieAdd = {this.props.onMovieAdd}
                    />];
        } else {
          return [];
        }
    })

    return (
      <div>
        { displayMovies }
      </div>
    )
  }
}

export default SearchMatches;
