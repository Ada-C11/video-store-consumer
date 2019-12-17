import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import video from '../images/blockbusterContainer.jpg';
import './Library.css';



class Library extends Component {
  render() {
      const movieComponents = this.props.movies.map((movie, i) => {

        if (movie.release_date !== null && parseInt(movie.release_date.substr(0, 4),10) < 2000) {
        return (
            <div key={i} className="movie">
            <div className="movie__section">
              <h3 className="movie__title">{movie.title}</h3>
              <div className="cover__container">
                <img className="cover" src={movie.image_url} alt="movie cover"/>
                <div className="movie__info">
                    {movie.overview}
                </div>
              </div>

              <button onClick={() => this.props.onSelectMovieCallback(movie.id)} >
                Select Movie
              </button>
            </div>
        </div>
        )
        }
    });

    return (
        <section>
          <ul id="movie_container">
            {movieComponents}
          </ul>
        </section>
      );
  }
}

Library.propTypes = {

};

export default Library;