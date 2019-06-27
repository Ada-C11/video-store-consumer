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


  const createTableData = () => {
    return Object.keys(customer).map((rowData, i) => {

      let updatedRowData = customer[rowData]

      if (rowData === "registered_at") {
        updatedRowData = formatDate(updatedRowData);
      } else if (rowData === "account_credit") {
        updatedRowData = `$${updatedRowData}`
      } 

      return (
        <td key={i}>
          {updatedRowData}
        </td>
      )
    });
  }

  return (
    <tr id="table-rows" onClick={onClickCustomer}>
      {createTableData()}
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
