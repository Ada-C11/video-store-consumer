import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Rental extends Component {
  render() {

    return (
      <section>
        <p>
        { this.props.id }
        </p>
        { this.props.title }
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
      </section>
    )
  }
}

Rental.propTypes ={
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  release_date: PropTypes.string,
  image_url: PropTypes.string,
  external_id: PropTypes.number,
  onRentalSelect: PropTypes.func,
  onRentalAdd: PropTypes.func,
}

export default Rental;