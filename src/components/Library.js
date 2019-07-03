import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Library.css';


class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      errorMessage: null,
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
    
  render() {

    const movieCollection = this.state.movies.map((movie) => {
      return <Movie key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        external_id={movie.external_id}/>
    });
    return (
      <main>
        <h1>Rewind Movies Library</h1>
        <div>
          {this.state.errorMessage ? `An error has occurred: ${this.state.errorMessage}` : null }
        </div>
        <section className="library-container">
          {movieCollection}
        </section>
      </main>
    )
  }

}

export default Library;
