import React, { Component } from 'react';
import axios from 'axios'
import Customer from './Customer'
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

class CustomerListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers:[],
      error: null
    };
  }

  componentDidMount() {
    const URL = "http://localhost:3001/customers"
    axios.get(URL)
      .then((response) => {
        this.setState({ customers: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { customers } = this.state;
    const customerList = customers.map((customers) => {
      const {id, name, registered_at, address, 
            city, state, postal_code, phone, 
            account_credit, movies_checked_out_count} = customers;
      return ( <Customer key={id} id={id} name={name} registered_at={registered_at}
              address={address} city={city} state={state} postal_code={postal_code}
              phone={phone} account_credit={account_credit} 
              movies_checked_out_count={movies_checked_out_count} 
              onSelectHandler={this.props.onSelectCustomerCallback}
              /> )
    });

    const errorSection = (this.state.error) ? 
    (<section className="alert alert-danger">
       Error: {this.state.error}
     </section>) : null;

    return (
      <section>
        {errorSection}
        <div className="table-container">
          
          <table className="table table-striped">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Registed At</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">State</th>
              <th scope="col">Postal Code</th>
              <th scope="col">Phone</th>
              <th scope="col">Account Credit</th>
              <th scope="col">Movies Checked Out Count</th>
            </tr>
            </thead>
            <tbody>
              {customerList}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
};

CustomerListPage.propTypes = {
  onSelectCustomerCallback: PropTypes.func,
};

export default CustomerListPage;