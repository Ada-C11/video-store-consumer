import React from 'react'
import PropType from 'prop-types'

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

    <article className="card width">
      <div className="Customer-card card-body"> 
      <h3 className="card-title">{name}</h3>
      <h4 className="card-text">{phone}</h4>
      <p className="card-text">{address}</p>
      <p className="card-text">{city}, {state}, {postalCode}</p>
      <h4 className="card-text"> Account credit: {accountCredit}</h4>
      <p className="card-text">Movies checked out: {moviesCheckedOutCount === 0 ? 'none' : moviesCheckedOutCount}</p>
      <button
        className="btn btn-secondary"
        onClick={onSelectCustomer}>
        Select Customer
      </button>
      </div>
    </article>
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
