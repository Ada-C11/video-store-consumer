import React from 'react'
import PropType from 'prop-types'
import {Card, Button} from 'react-bootstrap'
import './Customer.css'

const Customer = (props) => {
  const {
    name, id, phone, address, city, state, postalCode, 
    moviesCheckedOutCount, accountCredit, selectCustCallback
  } = props

  const onSelectCustomer = (e) => {
    e.preventDefault();
    console.log('Selecting this customer')
    selectCustCallback(id)
  }

  const checkedOutFormat = (count) => {
    if (count === 1) {
      return (`${count} movie currently checked out.`)
    }
    else {
      return (`${count} movies currently checked out.`)
    }
  }
  return (

    <Card style={{ width: '18rem' }} className="card">
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{address} </Card.Text>
      <Card.Text>{city}, {state}, {postalCode} </Card.Text>
      <Card.Text>{phone}</Card.Text>
      <Card.Text>${accountCredit} account credit</Card.Text>
      <Card.Text className="card-text">{checkedOutFormat(moviesCheckedOutCount)}</Card.Text>
      <Button className="btn btn-secondary" onClick={onSelectCustomer}>
        Select Customer
      </Button>
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
