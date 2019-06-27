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
      <li><button className="btn press select" onClick={() => this.props.selectMovieCallBack(movie)}>
      Select Movie
    </button></li>
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