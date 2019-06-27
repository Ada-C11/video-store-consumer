import React, {Fragment} from 'react';
import Customer from './Customer';
import './CustomerList.css';
import PropTypes from 'prop-types';

const HEADERS = ["id", "name", "member since", "address", "city", "state", 
                  "zip code", "phone", "credit", "checked out"]

const CustomerList = (props) => {
  const { customers, onSelectCustomerCallback } = props

  const renderTableHeaders = () => {
    return HEADERS.map((header, i) => {
      return (
        <th key={i}>
          {header}
        </th>
      );
    });
  };

  const renderCustomers = customers.map( (customer, i) => {
      return (
        <Fragment key={i}>
          <Customer 
            customer={customer} 
            onSelectCustomerCallback={onSelectCustomerCallback}
            />
        </Fragment>
      );
    });

  return (
      <section id="customer-table">
        <h1>Customers</h1>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              {renderTableHeaders()}
            </tr>
          </thead>
          <tbody>
            {renderCustomers}
          </tbody>
        </table>
      </section>
      

  )
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal_code: PropTypes.string.isRequired,
      registered_at: PropTypes.string.isRequired,
      movies_checked_out_count: PropTypes.number.isRequired,
      account_credit: PropTypes.number.isRequired,
    })
  ).isRequired, 
  onSelectCustomerCallback: PropTypes.func,
};

export default CustomerList;
