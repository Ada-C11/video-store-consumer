import React from 'react';
import PropTypes from 'prop-types';
import CustomerRentals from './CustomerRentals';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
// import './Customer.css';

const Customer = (props) => {
  const onSelectCustomer = () => {
    props.onSelectCustomerCallback(props.customer.id)
  }

  const onDeselectCustomer = () => {
    props.onDeselectCustomerCallback(props.customer.id)
  }

  const onViewRentals = () => {
    props.onCustomerRentalsCallback(props.customer.id)
  }

    
    const selectButton = (props.chosenCustomer === props.customer) ?
      <td><Button size="sm" variant="danger" onClick={onDeselectCustomer}>Deselect</Button></td> :
      <td><Button size="sm" variant="dark" onClick={onSelectCustomer}>Select Customer</Button></td>

    const rentalButton =  (props.viewCustomerRental) ?
      <td><Button variant="danger" size="sm" onClick={onViewRentals}>Close</Button></td> :
      <td><Button variant="outline-dark" size="sm" onClick={onViewRentals}>Customer Rentals</Button></td>
       
  return (
      <tr>
        <td>{props.customer.id}</td>
        <td>{props.customer.name}</td>
        {selectButton}
        {rentalButton}
        {props.viewCustomerRental && 
        <Card>
          <Card.Body>
            <Card.Title>
              {props.customer.name}'s Rentals
            </Card.Title>
            <Card.Text>
                <CustomerRentals rentals={props.findRentalsCallback(props.customer.id)}/>
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