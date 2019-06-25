import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import MovieCard from './MovieCard'

import './MovieLibrary.css';

class MovieLibrary extends Component {
  constructor(props) { 
    super(props)

    this.state = {
      movieList: [],
      selectedMovie: ""
    }
  }

  componentDidMount() {
    const endpoint = 'http://localhost:3000/movies'
    axios.get(endpoint)
      .then((response) => {
        console.log(response.data);

        const newMovieList = response.data.map((movie) => {
          
          const newMovie = { 
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            external_id: movie.external_id,
            inventory: movie.inventory
          }
          return newMovie
        })

        console.log(newMovieList);

        this.setState({movieList: newMovieList});
      
      })
      
      .catch((error) => {
        console.log(error);
      })
  }

  

  render() {
    const display = this.state.movieList.map((movie) => {
      const { id, title, overview, release_date, image_url, external_id, inventory } = movie;
      return (<section>
        <MovieCard 
          id={id}
          key= {id}
          title={title}
          overview={overview}
          release_date={release_date}
          image_url={image_url}
          external_id={external_id}
          inventory={inventory}
          selectMovieCallback={this.props.selectMovie}
        />
      </section>);
    });

    return (
      <div className="movie-library">
        {display}
      </div>
    );     
  }
}

MovieLibrary.propTypes = {
  
};

export default MovieLibrary;