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
      <td><Button variant="danger" onClick={onDeselectCustomer}>Deselect</Button></td> :
      <td><Button onClick={onSelectCustomer}>Select Customer</Button></td>

  return (
    <tr>
      <td>{props.customer.name}</td>
      {selectButton}
      {/* <td><Button onClick={onSelectCustomer}>Select Customer</Button></td> */}
      <td><Button onClick={onViewRentals}>Customer Rentals</Button></td>

      {props.viewCustomerRental && <Card>
        <Card.Body>
          <Card.Title>
            {props.customer.name}'s Rentals
          </Card.Title>
          <Card.Text>
            <table>
              <CustomerRentals rentals={props.findRentalsCallback(props.customer.id)}/>
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