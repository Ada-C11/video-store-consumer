import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';


class SearchTMDB extends Component {
   constructor(props) {
       super(props);

       this.state = {
           movieAddToRentalLib: null,
           searchMovie: "",
           searchResults: [],
           apiError: null,
           apiSuccess: null,
       };
   }

   onSearchChange = (event) => {
       const updatedState = {
           searchMovie: event.target.value
       }
       this.setState(updatedState)
   }


   onSearchButtonHandler = () => {

    if (this.state.searchMovie) {
        axios.get('http://localhost:3001/movies?query=' + this.state.searchMovie)
        .then((response) => {
            const updatedMovieList = response.data

            this.setState({
                searchResults: updatedMovieList
            });
       })
       .catch((error) => {
           this.setState({
               apiError: error.message
           })
       });

        }

   }

   onAddtoRentalButtonHandler = (movie) => {
    const slashIndex = movie.image_url.lastIndexOf('/')
    const imageUrl = movie.image_url.slice(slashIndex, movie.image_url.length)
    const movieDataToSendToApi ={
            "movie": {
              "title": movie.title,
              "overview": movie.overview,
              "release_date": movie.release_date,
              "image_url": imageUrl,
              "external_id": movie.external_id,
              "inventory": 1
            }
    }

    axios.post('http://localhost:3001/movies',movieDataToSendToApi)
    .then((response) => {
      console.log(response)
      if (response.data.movie) {
        const successMessage = `Yay! Succesfully added ${response.data.movie.title}`
        this.setState({
            apiSuccess: successMessage
        })
      } else {
        const successMessage = response.data.errors
        this.setState({
            apiSuccess: successMessage
        })
      }

   })
   .catch((error) => {
       this.setState({
           apiError: error.message
       })
   });
   }

   render() {
        const eachMovie = this.state.searchResults.map((movie, i) => {
            return (
                <div key={i}>
                    <section className="movie_search_card" key={i}>
                        <img src={movie.image_url} alt="movie poster" className="movie_IMG" />
                        <button
                        onClick={() => {this.onAddtoRentalButtonHandler(movie)}}>
                            Add: {movie.title}
                        </button>
                    </section>
                </div>
            )
        })
        const successSection = (this.state.apiSuccess) ? (<section>{this.state.apiSuccess} </section>) : null;
       const errorSection = (this.state.apiError) ? (<section> Error: {this.state.apiError}</section>) : null;
    return (
        <main className="movie_search">
            <h2>Movie Search Page</h2>
            <p>To find a movie by title, type the movie title in the search bar</p>
            <label>
                Movie Title:
                <input
                type="text"
                onChange={this.onSearchChange}>
                </input>
            </label>
            <input className="most_btns"type="submit" name="submit" value="Search"
              onClick={this.onSearchButtonHandler} />
            {errorSection}
            {successSection}
            {eachMovie}
        </main>
        )
    }
}

export default SearchTMDB;
