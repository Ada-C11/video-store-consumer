import React, {Fragment} from 'react';

const Customer = (props) => {
    const { customer, onSelectCustomerCallback } = props

  const onClickCustomer = () => {
    onSelectCustomerCallback(customer);
  }

  return (
    <Fragment>
      <td>
        {customer.id}
      </td>
      <td>
        {customer.name}
      </td>
      <td>
        <button onClick={onClickCustomer}>Select for Rental</button>
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
        {customer.registered_at}
      </td>
      <td>
        {customer.movies_checked_out_count}
      </td>
      <td>
        ${customer.account_credit}
      </td>
    </Fragment>
  )
}

export default Customer;
