import React, { Component } from "react";
// import logo from "./logo.svg";
import "./MovieSearch.css";



class MovieSearch extends Component {
  constructor(props){
    super(props)
  }

  // handleclick=()=>{
  //   addMovieCallback
  // }

  render() {
        const collection = this.props.movies.map(movie => {
        // return movie["title"];
        return(
        <section key={movie.id}>
          
        <span> {movie.title} </span>

        <button
          type="button"
          className="btn btn-danger"
          aria-label="Close"
          // onClick={handleclick}

        >
          SELECT
        </button>
      </section>
    )
        });
    return (
      <div>
        <div>
          {collection}
        </div>
      </div>
    );
  }
}

export default MovieSearch;
