import React, { Component } from "react";
// import logo from "./logo.svg";
import "./MovieSearch.css";
import axios from 'axios';
import MovieSearchForm from "./MovieSearchForm"

class MovieSearch extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      // error: ""
    };
  }

  // componentDidMount() {

  getresult = (movies) => {
    const collection = movies.map((movie)=>{
      this.state.movies.push(movie)
    })
  }
     
   
      // this.setState({
      //   movies: movie
      // })

    
  
    
  


    render() {
      console.log(this.state.movies)
        const moviecollection = this.state.movies.map((movie) => {
            return(
            <section>
            <span> {movie["title"]} </span>

            <button
              type="button"
              className="btn btn-danger"
              aria-label="Close"
            >
              ADD
            </button>
          </section>
          )
        })
      return (
        <div>

        <div>
          <MovieSearchForm   getresultcallback={this.getresult}/>
          {/* getresultcallback={this.getresult} */}
        </div>
        <div>{this.state.movies}</div>
        </div>

      )
    };
  };

  export default MovieSearch;