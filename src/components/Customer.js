import React from 'react';
import PropTypes from 'prop-types';

const Customer = (props) => {
    const { customer, onSelectCustomerCallback } = props

  const onClickCustomer = () => {
    onSelectCustomerCallback(customer);
  }

  const formatDate = (date) => {
    let formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-US');
  }

  return (
    <tr id="table-rows" onClick={onClickCustomer}>
      <td>
        {customer.id}
      </td>
      <td>
        {customer.name}
      </td>
      <td>
        {customer.phone}
      </td>
      <td>
        {customer.address}
      </td>
      <td>
        {customer.city}
      </td>
      <td>
        {customer.state}
      </td>
      <td>
        {customer.postal_code}
      </td>
      <td>
        {formatDate(customer.registered_at)}
      </td>
      <td>
        {customer.movies_checked_out_count}
      </td>
      <td>
        ${customer.account_credit}
      </td>
    </tr>
  )
};

Customer.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    registered_at: PropTypes.string.isRequired,
    movies_checked_out_count: PropTypes.number.isRequired,
    account_credit: PropTypes.number.isRequired,
  }),
  onSelectCustomerCallback: PropTypes.func,
};

export default Customer;
