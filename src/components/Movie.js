import React, {Component} from 'react';
import './Movie.css'

class Movie extends Component {
  constructor (props) {
    super(props);
  }

  onClickHandler = () => {
    this.props.selectedCallback(this.props.movieId);
  }

  render () {
    return(
      <img className="movie" onClick={this.onClickHandler} src={this.props.imgUrl} alt={this.props.title}></img>
    );
  }
}

export default Movie;