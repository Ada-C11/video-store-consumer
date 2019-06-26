import React, { Component } from 'react';
import MovieSearchBar from './MovieSearchBar';
import SearchResult from './SearchResult';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


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

  addRental = (movieData) => {
    console.log(movieData);
    const rental = {
      title: movieData.title,
      overview: movieData.overview,
      release_date: movieData.release_date,
      image_url: movieData.image_url,
      external_id: movieData.external_id
    };

    Axios.post(`${baseURL}/movies`, rental)
    .then((response) => {
      console.log(response);
    })
  }

  render() {
    const {searchResults} = this.state;
    const resultList = searchResults.map((result) => {
      const {external_id, title, overview, release_date, image_url} = result;
      return ( <SearchResult 
              key={external_id} 
              title={title}
              overview={overview} 
              release_date={release_date} 
              image_url={image_url}
              external_id={external_id}
              onSelectHandler={this.addRental} />)
    });

    const errorSection = (this.state.error) ? 
    (<section className="alert alert-danger">
       Error: {this.state.error}
     </section>) : null;

    return (
    <section>
      {errorSection}
      <div>
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
            {resultList}
          </tbody>
        </table>
      </div>
    </section>
    );
  }
}

export default MovieSearchPage;