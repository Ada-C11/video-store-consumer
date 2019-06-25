import React from 'react'
import PropType from 'prop-types'

const Customer = (props) => {
  const {
    name, phone, address, city, state, postalCode, 
    moviesCheckedOutCount, accountCredit
  } = props

  const onSelectCustomer = () => {
    console.log('Selecting this customer')
    // Callback function up to App.
  }

  return (

    <article className="card width">
      <div className="Customer-card card-body"> 
      <h2 className="card-title">{name}</h2>
      <h4 className="card-text">{phone}</h4>
      <h4 className="card-text">{address}</h4>
      <h4 className="card-text">{city}</h4>
      <h4 className="card-text">{state}</h4>
      <h4 className="card-text">{postalCode}</h4>
      <h4 className="card-text">{accountCredit}</h4>
      <h6 className="card-text">{moviesCheckedOutCount}</h6>
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
