import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
    };
  }
  
  componentDidMount() {
    this.getLibrary()
  }

  getLibrary = () => {
    const url = `http://localhost:3000/movies`
    axios.get(url)
      .then((response) => {
        this.setState({ library: response.data });
        console.log(response)
      }) 
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const allMovies = this.state.library.map((movie, i) => {
      return <Movie
        key={i}
        content={movie}
        selectMovieCallBack={this.props.selectMovieCallBack}
      />
    })

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Movies</h1>
          <ul>{allMovies}</ul>
        </header>
      </div>
    );
  }
}

export default Library;