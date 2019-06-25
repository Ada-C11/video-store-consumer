import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Movie from './Movie';
import SearchForm from './SearchForm';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    }
  }

  searchCallback = (input) => {
    this.setState({
      queryString: input
    });
    console.log("Input", input)


    axios.get(this.props.url, { params: { query: input } })
      .then((response) => {
        const movieList = response.data.map((movie) => {

          return {
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            id: movie.external_id,
          }
        });
        console.log(movieList);
        this.setState({
          movies: movieList,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  };

  generateMovieComponents = () => {
    return this.state.movies.map((movie, i) => {
      return (
        <Movie
          key={movie.id}
          index={i}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          release_date={movie.release_date}
          image_url={movie.image_url}
        />
      )
    })

  }


  render() {
    // const movies = this.generateMovieComponents();
    const movies = this.props.generateMovieComponentsCallback(this.state.movies);
    return (
      <section>
        <SearchForm
          searchCallback={this.searchCallback}
        />
        <div>
          {movies}
        </div>
      </section>
    )
  }
}

Search.propTypes = {
  url: PropTypes.string,
}

export default Search;