import React from 'react';
import Customer from './Customer';

const CustomerList = (props) => {
    const { customers } = props

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
          <tr key={i}>
            <Customer customer={customer} />
          </tr>
        );
      });

    return (
        <section>
          <h1>Customers</h1>
          <table className="table">
            <thead>
              <tr>
                <th>
                  id
                </th>
                <th>
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
                  postal code
                </th>
                <th>
                  registered at
                </th>
                <th>
                  checked out count
                </th>
                <th>
                  account credit
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

export default CustomerList;
