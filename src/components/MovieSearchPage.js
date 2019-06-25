import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import MovieSearchBar from './MovieSearchBar';
import Movie from './Movie';
import Axios from 'axios';

const baseURL = `http://localhost:3001`;
class MovieSearchPage extends Component {
  constructor () {
    super();
    this.state = {
      searchResults: [],
      rentalAddedMessage: false,
      rentalToAdd: {}
    }
  };

  submitSearchQuery = (searchTerm) => {
    
    const formattedTerm = searchTerm.replace(' ', '%20') ;
    Axios.get(`${baseURL}/movies?query=${formattedTerm}`)
      .then((response) => {
        const results = response.data;
        this.setState({ searchResults: results })
        })
      .catch((error) => {
          this.setState({ error: error.message });
        });
  };

  addRental = (props) => {
    console.log(props);
    // Axios.get(`${baseURL}/movies/${title}`)
    //   .then((response) => {
    //     console.log(response.data);
    //   }) 
    // Axios.post(`${baseURL}/movies`, )
  }

  render() {
    const {searchResults} = this.state;
    const movieList = searchResults.map((result) => {
      const {external_id, title, overview, release_date} = result;
      return ( <Movie key={external_id} title={title}
              overview={overview} release_date={release_date} 
              onSelectHandler={this.addRental} />)
    });

    const errorSection = (this.state.error) ? 
    (<section className="error">
       Error: {this.state.error}
     </section>) : null;

    return (
    <section>
      {errorSection}
      <div>
        <Link to="/library">Movie Rental Library</Link>
        <Link to="/search">Search for a Movie</Link>
        <Link to="/customers">Customers</Link>
        <h3>MoviesSearchPage</h3>
        <MovieSearchBar searchCallback={this.submitSearchQuery} />
      </div>
      <div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Overview</th>
            <th scope="col">Release Date</th>
          </tr>
          </thead>
          <tbody>
            {movieList}
          </tbody>
        </table>
      </div>
    </section>
    );
  }
}

export default MovieSearchPage;