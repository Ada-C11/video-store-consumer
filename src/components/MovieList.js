import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';

//import './MovieList.css';

class MovieList extends Component {
    constructor() {
      super();
  
      this.state = {
        movies: [],
      };
    }
  
    componentDidMount() {
      this.getMovies()
    }
  
    getMovies = () => {
      axios.get('http://localhost:3000/movies')
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    }
  

    render() {
      const allMovies = this.state.movies.map((movie) => {
        return <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          release_date={movie.release_date}
          image_url={movie.image_url}
          external_id={movie.external_id}/>
      });
  
  
      return (
        <div >
          <div className="library">
            {allMovies}
          </div>
        </div>
      )
    }
  }
  
  MovieList.propTypes = {
  
  };
  
  export default MovieList;