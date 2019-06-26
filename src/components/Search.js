import React, { Component} from 'react';
import axios from 'axios';


class Search extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      searchList: []
    }
  }

  onChangeTitle = (event) => {
    let title = this.state.title;
    const value = event.target.value;
    title = value;
    this.setState({title})

  }

  onFormSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3090/movies?query=' + this.state.title.toString())
    .then((response) => {
      const searchList = response.data.map((movie) => {
          return movie
      })
      this.setState({searchList})
    })
    
  }


  onMovieSelect = (movie) => {
    return () => {
    axios.post('http://localhost:3090/movies', 
    {
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      image_url: movie.image_url,
      external_id: movie.external_id,
    }
    )
    .then((response) => {
      console.log(response)
    })
      let newState = this.state
      newState.searchList = [];
      this.setState({newState});
    }
  }

  searchDisplay = () => {
    return this.state.searchList.map((movie) => {
        return (
          <div>
            <p>{movie.title}</p>
            <p onClick={this.onMovieSelect(movie)}>Select!</p>
          </div>
        )
    })
  }

  render () {
    return (
      <div>
        <h2>Search</h2>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" value={this.state.title} onChange={this.onChangeTitle}/>
          <input type="submit" value="Search" />
        </form>
        <h4>{this.searchDisplay()}</h4>
      </div>
    );
  }
}

export default Search;