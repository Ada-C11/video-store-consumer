import React, { Component } from 'react';
import Movie from './Movie';
import './Library.css';

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
      <div className="">
        <h1 className="">Movies</h1>
        <ul className="movie-list">{allMovies}</ul>
      </div>
    );
  }
}

export default Library;