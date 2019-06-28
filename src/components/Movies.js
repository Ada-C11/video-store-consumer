import React from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie';
import './Movies.css';

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

  
  return (
    <div class="row">
      { displayMovies }
    </div>
  )
}

Movies.propTypes ={
  movieList: PropTypes.array,
  currentMovie: PropTypes.object,
  onMovieSelect: PropTypes.func,
}

export default Movies;