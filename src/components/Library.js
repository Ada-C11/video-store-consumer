import React, { Component } from 'react';
import Movie from './Movie';
import './Library.css';

class Library extends Component {

  render() {
    const allMovies = this.props.library.map((movie, i) => {
      return <div><Movie
        key={i}
        content={movie}
        selectMovieCallBack={this.props.selectMovieCallBack}
      />
      <button className="btn" onClick={() => this.props.selectMovieCallBack(movie)}>
      Select Movie
    </button>
    </div>

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