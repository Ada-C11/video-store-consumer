import React, { Component } from 'react';

import Rental from './Rental';

class Rentals extends Component {

  render() {
    if (this.props.rentalList.length > 0) {
      const displayRentals = this.props.rentalList.map((rental, i) => {
        return <Rental
                  key = {i}
                  id = {rental.id}
                  title = {rental.title}
                  overview = {rental.overview}
                  release_date = {rental.release_date}
                  image_url = {rental.image_url}
                  external_id = {rental.external_id}
                  />
      })
    } else {
      return ""
    }
    return (
      <div>
        { this.displayRentals }
      </div>
    )
  }
}

 export default Rentals; 