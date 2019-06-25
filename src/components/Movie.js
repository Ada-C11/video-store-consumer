import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  render() {

    return (
      <section onClick = {() => this.props.onMovieSelect(this.props.id)}>
        <h3> { this.props.id }. {this.props.title} </h3>
        <p>
          Overview: {this.props.overview }
        </p>
        <p>
          Release Date: {this.props.release_date}
        </p>
        <p>
          External ID: {this.props.external_id}
        </p>
        <img src={this.props.image_url} />
      </section>
    )
  }
}

Movie.propTypes ={
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number,
  onMovieSelect: PropTypes.func,
}

export default Movie;