import React, { Component } from 'react';
import axios from 'axios';

class Library extends Component {
    constructor() {
      super();
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
    const allmovies = this.state.library.map((movie, i) => {
      return <li>{movie.title}</li>
    })

    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Movies</h1>
          <p className="App__intro-text">
          <ul>{allmovies}</ul>
          </p>
        </header>
      </div>
    );
  }
}

export default Library;