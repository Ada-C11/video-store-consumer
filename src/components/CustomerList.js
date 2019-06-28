import React from 'react';
import PropTypes from 'prop-types';

const CustomerList = (props) => {

  const {customerList} = props

  const displayCustomers = customerList.map((customer, i) => {
    return (
      <tr key={i}>
        <td>{customer.name}</td>
        <td>{customer.address}</td>
        <td>{customer.postal_code}</td>
        <td>{customer.phone}</td>
        <td>{customer.account_credit}</td>
        <td>
          <button type="button" className="btn btn-info" onClick={() => {props.selectCustomer(customer)}}>
            Select Customer
          </button>
        </td>
      </tr>
    )
  })

  return (
    <div className="table-responsive">
        <table class="table cart-table">
        <thead class="table-info">
          <th scope="col">Customer Name</th>
          <th scope="col">Address</th>
          <th scope="col">Zipcode</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Account Balance</th>
          <th scope="col"></th>
        </thead>
        <tbody>
          { displayCustomers }
        </tbody>
        </table> 
    </div>
  );
}

CustomerList.propTypes = {
  customerList: PropTypes.array,
  selectCustomer: PropTypes.func.isRequired,
};


export default CustomerList;
