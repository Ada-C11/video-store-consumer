import React from 'react';

import Movie from './Movie';

const SearchMatches = (props) => {
  const displayMovies = props.searchMatches.flatMap(
    ({ id, title, overview, release_date, image_url, external_id }) => {
      // Construct a RegExp object with 'i' so that the match is case
      // insensitive.
      const query = new RegExp(props.queryString, 'i');

      if (title.match(query)) {
        return [<Movie
                  key = {id}
                  id = {id}
                  title = {title}
                  overview = {overview}
                  release_date = {release_date}
                  image_url = {image_url}
                  external_id = {external_id}
                  onMovieAdd = {props.onMovieAdd}
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

export default SearchMatches;
