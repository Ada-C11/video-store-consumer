import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Movie from './Movie';
import './Library.css'

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      error: null
    }
  }

  componentDidMount() {
    const getURL = 'http://localhost:3002/movies'
    axios.get(getURL)
      .then((response) => {
        console.log(response.data)
        const movies = response.data.map((movie) => {
          const movieListing = {
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            external_id: movie.external_id
          }
          return movieListing
        })
        this.setState({ movies });
      })
      .catch((error) => {
        this.setState({error: error.message});
      })
  }

  selectMovie = (title) => {
    this.props.selectMovieCallback(title);
  }

  render() {
    const movieComponents = this.state.movies.map((movie, index) => {
        return (
          <Movie 
          key={index}
          title={movie.title}
          overview={movie.overview}
          release_date={movie.release_date}
          image_url={movie.image_url}
          selectMovieCallback={this.selectMovie}
          />
        )
    })
    return (
      <div className="library">
        { movieComponents }
      </div>
    )
  }
}

Library.propTypes = {
  selectMovieCallback: PropTypes.func
}

export default Library