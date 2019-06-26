import React from 'react'
import PropType from 'prop-types'
import {Card, Button} from 'react-bootstrap'
import './Customer.css'

const Customer = (props) => {
  const {
    name, phone, address, city, state, postalCode, 
    moviesCheckedOutCount, accountCredit
  } = props

  const onSelectCustomer = (e) => {
    e.preventDefault();
    console.log('Selecting this customer')
    props.selectCustCallback(props.id)
  }

  return (

    <Card style={{ width: '18rem' }} className="card">
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{address} </Card.Text>
      <Card.Text>{city}, {state}, {postalCode} </Card.Text>
      <Card.Text>{phone}</Card.Text>
      <Card.Text>${accountCredit} account credit</Card.Text>
      <Card.Text className="card-text">{moviesCheckedOutCount} movies currently checked out </Card.Text>
      <button className="btn btn-secondary" onClick={onSelectCustomer}>
        Select Customer
      </button>
    </Card.Body>
  </Card>
  )
}

Customer.propTypes = {
  acountCredit: PropType.number,
  address: PropType.string,
  city: PropType.string,
  moviesCheckedOutCount: PropType.number,
  name: PropType.string,
  postalCode: PropType.string,
  phone: PropType.string, 
  state: PropType.string,
};

export default Customer;
