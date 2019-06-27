import React, {Fragment} from 'react';
import Customer from './Customer';
import './CustomerList.css';
import PropTypes from 'prop-types';

const CustomerList = (props) => {
    const { customers, onSelectCustomerCallback } = props

    // const tableHeaders
    // if (customerObject) { console.log( Object.keys(customerObject) ) }
  
    // // come back and refactor table headers
    // const tableHeaders = () => {
    //   if (customerObject) {
    //     Object.keys(customerList[0]).map((key) => {
    //       return (
    //         <th>
    //           {key}
    //         </th>
    //       )
    //     });
    //   }
    // }

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
                <th scope="col">
                  id
                </th>
                <th scope='col'>
                  name
                </th>
                <th>
                  phone 
                </th>
                <th>
                  address
                </th>
                <th>
                  city
                </th>
                <th>
                  state
                </th>
                <th>
                  postal
                </th>
                <th>
                  registered
                </th>
                <th>
                  rentals out
                </th>
                <th>
                  credit
                </th>
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
