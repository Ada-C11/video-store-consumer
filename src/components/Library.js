import React, {Component} from 'react';
import MovieCard from './MovieCard';
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

  render () {
    const movieCards = this.state.movieLibrary.map((movie, i) => {
      return (
        <MovieCard key={i} movie={movie} selectMovie={() => {this.props.selectMovie(movie)}} />
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



export default Library;