import React, { Component } from 'react';
import axios from 'axios'

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
        return (<Movie 
        key={movie.id}
        id={movie.id}
        title={movie.title}
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
    })
  }


render () {
  return (
  <div>
  <h2>Library</h2>
  <h2>{this.generateMovieList()}</h2>
  </div>
  );
  }
}

export default Library;