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
    }
  }

  getMovies(){
    const endpoint = 'http://localhost:3000/movies'
    axios.get(endpoint)
      .then((response) => {

        const newMovieList = response.data.map((movie) => {
          
          const newMovie = { 
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            image_url: movie.image_url,
            external_id: movie.external_id,
            inventory: movie.available_inventory
          }
          return newMovie
        })

        this.setState({movieList: newMovieList});
      
      })
      
      .catch((error) => {
        this.props.addNotificationCallback(
                        {
                          toastTitle: "Error!",
                          toastMessage:`Could not retrieve movies: ${error.message}`,
                          toastTimestamp:Date.now(),
                          error: true,
                      }
        )
        
      })
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.getMovies();
    }
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
          buttonDisplay='Select Movie'
          parentComponent='movieLibrary'
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
  selectMovie:PropTypes.func,
  addNotificationCallback:PropTypes.func,
};

export default MovieLibrary;