import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryResults: [],
    }
  }

  searchMovies = () => {
    axios.get('http://localhost:3000/movies?query=' + this.state.query)
      .then(response => {
        const movies = response.data.map(movie => {
          console.log(movie)
          return movie;
        });
        this.setState({
          queryResults: movies,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  };

  onInput = event => {
    const newSearch = {};
    newSearch[event.target.name] = event.target.value;
    this.setState(newSearch);
  };

  findMovie = event => {
    event.preventDefault();
    this.searchMovies();
  };

  // TODO make map results list items
  movieSearchList = () => {
    axios.get('http://localhost:3000/movies')
      .then((response) => {
        const allMovies = response.data
        this.props.setMovieState(allMovies)
      })
      .catch((error) => {
        console.log(error);
      })

    return this.state.queryResults.map((movie) => {
      return (
          <div className="card">
            <div className="card-body">
              <img className="movie-image"
                src={movie.image_url}
                alt="movie" />
              <p className="card-title"><strong>{movie.title}</strong></p>
              <p className="card-subtitle mb-2 text-muted">{parseInt(movie.release_date)}</p>
              <p className="card-text">{movie.overview}</p>
              {
                this.props.movieLookUp(movie.external_id) ? (
                  <p>Movie already in database.</p>
                ) : (
                    <button onClick={this.addMovie(movie)}> Add Movie</button>
                  )
              }
            </div>
          </div>
       
      );
    });
  };

  addMovie = (movie) => {
    return () => {
      axios.post('http://localhost:3000/movies', {
        key: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        image_url: movie.image_url,
        external_id: movie.external_id,
        inventory: 27
      })
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        })
      let newState = this.state
      newState.queryResults = [];
      this.setState({ newState });
    }
  }

  render() {
    const messageSection = (this.state.customerMessage) ?
      (<section className="error">
        {this.state.customerMessage}
      </section>) : null;

    return (
      <div className="card" >
        <section className="card-body">
          <form onSubmit={this.findMovie}>
            <label htmlFor="query">Movie Search: </label>
            <input name="query" onChange={this.onInput} />
            <input className="btn btn-light" type="submit" name="submit" value="Search" />
          </form>
        </section>
        <div className="movie-cards">
        {this.movieSearchList()}
        </div>
        {messageSection}
      </div>
    );
  }
}

Search.propTypes = {
  setMovieState: PropTypes.func,
  movieLookUp: PropTypes.func,
};

export default Search;