import React from 'react';

import Movie from './Movie';

const Movies = (props) => {
  const displayMovies = props.movieList.flatMap(
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
                  onMovieSelect = {props.onMovieSelect}
                  />];
      } else {
        return [];
      }
  })

  const displayCurrMovie = (props.currentMovie === undefined) ? "None" : props.currentMovie.title
  
  return (
    <div>
      Currently selected movie: { displayCurrMovie }
      { displayMovies }
    </div>
  )
}

export default Movies;