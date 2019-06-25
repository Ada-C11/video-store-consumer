import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import axios from 'axios'
import Movie from "./Movie"

class RentalLibraryPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      error: null
    };
  }
  componentDidMount() {
    const URL = "http://localhost:3001/movies"
    axios.get(URL)
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const {movies} = this.state;
    const movieList = movies.map((movie) => {
      const {id, title, overview, release_date} = movie;
      return ( <Movie key={id} id={id} title={title}
              overview={overview} release_date={release_date} buttonName="Select" />)
    });

    const errorSection = (this.state.error) ? 
    (<section className="error">
       Error: {this.state.error}
     </section>) : null;

    return (
      <section>
        {errorSection}
        <div>
          <table class="table table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
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

export default RentalLibraryPage;