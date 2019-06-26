import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Movie from "./Movie";
import PropTypes from 'prop-types';

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
      const {id, title, overview, release_date, image_url} = movie;
      return ( <Movie key={id} id={id} title={title} image_url={image_url}
              overview={overview} release_date={release_date} 
              onSelectHandler={this.props.onSelectMovieCallback} />)
    });

    const errorSection = (this.state.error) ? 
    (<section className="alert alert-danger">
       Error: {this.state.error}
     </section>) : null;

    return (
      <section>
        {errorSection}
        <div className="table-container">
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col" >Poster</th>
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

RentalLibraryPage.propTypes = {
  onSelectMovieCallback: PropTypes.func,
};

export default RentalLibraryPage;