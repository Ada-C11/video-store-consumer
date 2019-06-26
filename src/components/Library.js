import React, {Component} from 'react';
import MovieCard from './MovieCard';
import PropTypes from 'prop-types'
import axios from 'axios';

class Library extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      movieLibrary: [],
    }
  }

  componentDidMount() {
    axios.get('/movies')
      .then(response => {
        console.log(response)
        this.setState({
          movieLibrary: response.data
        })
      })
      .catch(error => console.log(error))
  }

  filterMovies(title) {
    const movieExists = this.state.movieLibrary.filter(movie => movie.title === title);
    if (movieExists) {
      return true;
    } else {
      return false;
    }
  }

  render () {
    const movieCards = this.state.movieLibrary.map((movie, i) => {
      return (
        <MovieCard key={i} movie={movie} filterMovies={this.filterMovies} selectMovie={() => {this.props.selectMovie(movie)}} />
      )
    })
    return (
      <div>
        <p>Movie Library</p>
        { movieCards }
      </div>
    );
  }
};

Library.propTypes = {
  movieLibrary: PropTypes.array,
  selectMovie: PropTypes.func.isRequired,
}

export default Library;