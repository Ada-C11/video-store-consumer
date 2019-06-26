import React, { Component } from 'react';
import axios from 'axios';

import Movie from './Movie';

class Movies extends Component {

  render() {
    const displayMovies = this.props.movieList.flatMap(
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
                    onMovieSelect = {this.props.onMovieSelect}
                    />];
        } else {
          return [];
        }
    })

    const displayCurrMovie = (this.props.currentMovie === undefined) ? "None" : this.props.currentMovie.title
    
    return (
      <div>
        Currently selected movie: { displayCurrMovie }
        { displayMovies }
      </div>
    )
  }
}

export default Movies;