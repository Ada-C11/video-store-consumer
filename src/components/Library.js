import React, { Component } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

import Movie from './Movie'

class Library extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      movieList: [],
    };
  }

    generateMovieList = () => {
      console.log(this.props)
      return this.state.movieList.map((movie) => {
        console.log(movie)
        return (<Movie 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        release_date={movie.release_date}
        overview={movie.overview}
        image_url={movie.image_url}
        addMovieToRentCallback = {this.props.addMovieToRentCallback}
        />)
      })
    }

    componentDidMount() { 
      axios.get("http://localhost:3090/movies") 
      .then((response)=>{
        const movieList = response.data.map((movie) => {
          return movie
        })
      this.setState({movieList})
      console.log(movieList)
    })
  }


render () {
  return (
  <div>
    <h2>Library</h2>
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">IMG</th>
          <th scope="col">Title</th>
          <th scope="col">Overview</th>
          <th scope="col">Release Date</th>
        </tr>
      </thead>
      <tbody>
        {this.generateMovieList()}
      </tbody>
    </table>
  </div>
  );
  }
}

export default Library;