import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  render() {
    // Movie from SearchMatches gets onMovieAdd
    const displayAddButton = (this.props.onMovieAdd === undefined) ? "" : <button onClick = {() => this.props.onMovieAdd(this.props.id)}>Add Me</button>

    // Movie from Movies gets onMovieSelect
    const displayClickableTitle = (this.props.onMovieSelect === undefined) ? <h3>{this.props.title}</h3> : <h3 onClick={() => this.props.onMovieSelect(this.props.id)}>{this.props.title}</h3>
    
    return (
      <section>
        <p>
          { this.props.id }.
        </p>
        { displayClickableTitle }
        <p>
          Overview: {this.props.overview }
        </p>
        <p>
          Release Date: {this.props.release_date}
        </p>
        <p>
          External ID: {this.props.external_id}
        </p>
        <img src={this.props.image_url} alt={this.props.title} />
        { displayAddButton }
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
  onMovieAdd: PropTypes.func,
}

export default Movie;