import React, {Component} from 'react';

class Movie extends Component {
  constructor (props) {
    super(props);
  }

  onClickHandler = () => {
    this.props.selectedCallback(this.props.movieId);
  }

  render () {
    return(
      <button onClick={this.onClickHandler}>
        <section>
          <img src={this.props.imgUrl} alt={this.props.title}></img>
        </section>
      </button>
    );
  }
}

export default Movie;