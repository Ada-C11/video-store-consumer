import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Library.css';


class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      errorMessage: ''
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({movies: response.data})
      console.log(this.state.movies)
    })
    .catch((error) => {
      this.setState({errorMessage: error.message})
      console.log(error.message)
    })
  }

  // TO DO: confirm this works
  findMovieForRental = (movieId) => {
    console.log(`In Library ${movieId}`);
    const clickedMovie = this.state.movies.find( movie => movie.id === movieId)
    this.props.selectedMovie(clickedMovie.title)
  }
  
  render() {

    const movieCollection = this.state.movies.map((movie) => {
      return <Movie key={movie.id}
        id={movie.id}
        title={movie.title}
        releaseDate={movie.overview}
        imageUrl={movie.image_url}
        external_id={movie.external_id}/>
    });
    return (
      <section className="library-container">
        <h1> Rewind Movies libary</h1>
        {movieCollection}
      </section>
    )
  }

}

export default Library;
