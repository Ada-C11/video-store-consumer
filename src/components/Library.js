import React, { Component } from 'react';
import axios from 'axios';
import Movie from './Movie';

class Library extends Component {

  render() {
    const allMovies = this.props.library.map((movie, i) => {
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