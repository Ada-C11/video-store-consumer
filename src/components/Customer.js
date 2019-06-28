import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
// import './Customer.css';

const Customer = (props) => {
  const onSelectCustomer = () => {
    props.onSelectCustomerCallback(props.customer.id)
  }

  const onViewRentals = () => {
    props.onCustomerRentalsCallback(props.customer.id)
  }

  const customerRentals = () => {
    const rentalHTML = props.customerRentals.map((rental, i) => {
      return <tr key={i}><td>{rental["movie"]}</td><td>{rental["checkout_date"]}</td><td>{rental["due_date"]}</td></tr>
    })

    return rentalHTML
  }

  return (
    <tr>
      <td>{props.customer.name}</td>
      <td><Button onClick={onSelectCustomer}>Select Customer</Button></td>
      <td><Button onClick={onViewRentals}>Customer Rentals</Button></td>

      {props.viewCustomerRental && <Card>
        <Card.Body>
          <Card.Title>
            {props.customer.name}'s Rentals
          </Card.Title>
          <Card.Text>
            <table>
              {customerRentals()}
            </table>
          </Card.Text>
        </Card.Body>
      </Card>}
    </tr>
  )
}

Customer.propTypes = {
  customer: PropTypes.object.isRequired,
  viewCustomerRental: PropTypes.bool,
  customerRentals: PropTypes.array,
  onSelectCustomerCallback: PropTypes.func.isRequired,
  onCustomerRentalsCallback: PropTypes.func.isRequired,
};

export default Customer;