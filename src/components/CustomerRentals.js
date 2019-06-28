import React from 'react';
import PropTypes from 'prop-types';
// import './CustomerRentals.css';

const CustomerRentals = (props) => {
  const rentalHTML = props.rentals.map((rental, i) => {
    return <tr key={i}>
          <td>{rental["movie"]}</td>
          <td>{rental["checkout_date"]}</td>
          <td>{rental["due_date"]}</td>
        </tr>
  })

  return rentalHTML
}

CustomerRentals.propTypes = {
  rentals: PropTypes.array,
};

export default CustomerRentals;