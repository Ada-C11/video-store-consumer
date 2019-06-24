import React, { Component } from "react";
// import logo from "./logo.svg";
import "./MovieSearch.css";
import axios from 'axios';
import MovieSearchForm from "./MovieSearchForm"

class MovieSearch extends Component {
    constructor() {
      super();
  
      this.state = {
        Movies: [],
        error: ""
      };
    }
    
    componentDidMount() {
        const URL = "https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false"
        axios.get(URL)
          .then((response) => {
            const movies = response.data.map((movie) => {
              const newMovie = {
                ...movie,
              }
              return newMovie
            })
            console.log(movies)
            this.setState({
              movies: movies,
            });
          })
          .catch((error) => {
            console.log(error);
            alert('Error happened');
            this.setState({ error: error.message });
          });
      }
    searchMovieCallback = (movie) => {
        const movieIds = this.state.movies.map(item => item.movie.id)
    
        this.setState({
          movies: [...this.state.movies, { movie:{...movie, id: Math.max(...movieIds) + 1 }}]
        });
    //     axios.post(`${this.props.url}${this.props.boardName}/cards`, {text: card.text, emoji: card.emoji})
    //     .then((response) => {
    //       console.log(response)
    //     })
    //     .catch((error)=> {
    //       console.log(error)
    //       alert('Error happened');
    //       this.setState({ error });
    //     })
      }

    render() {
    //     const moviecollection = this.state.movies.map((movie, i) => {
    //       return ([
    //         <Movie
    //           key={i}
    //           id={re["card"].id}
    //           text={card["card"].text}
    //           emoji={card["card"].emoji}
    //           onDeleteCard={this.onDeleteCard}
    //         />]
    //       )
    //     })
        return (
    //       <div>
    //         <header classname="validation-errors-display">
    //           {this.state.error}
    //         </header>
    <div>
            <div classname="board">
              <p>List of movies</p>
            </div>
                    <div>
                    <MovieSearchForm searchMovieCallback={this.searchMovieCallback}/>
                  </div>
                  </div>
    //         <div>
    //           <NewCardForm addCardCallback={this.addCardCallback}/>
    //         </div>
    //       </div>
        )
      };
    };

export default MovieSearch;