import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Library.css';

class Library extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({movies: response.data})
    })
    .catch((error) => {
      this.setState({error: error.message})
    })
  }

  // TO DO: find movie for the rental
  
  render() {
    console.log(this.props)

    const movieCollection = this.state.movies.map((movie) => {
      return <Movie key={movie.id}
        id={movie.id}
        title={movie.title}
        releaseDate={movie.release_date}
        imageUrl={movie.image_url}
        external_id={movie.external_id}/>
    });
    return (
      <section className="library-container">
        {movieCollection}
      </section>
    )
  }

}

export default Library;
