import React, {Component} from 'react';

class Movie extends Component {
  constructor (props) {
    super(props);
  }

  onClickHandler = () => {
    console.log('a movie is clicked');
    this.props.selectedCallback(this.props.movieId);
  }

  render () {
    return(
      <button onClick={this.onClickHandler}>
        <section>
          <img src={this.props.imgUrl}></img>
        </section>
      </button>
    );
  }
}

export default Movie;