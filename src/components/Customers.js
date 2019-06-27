import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios  from 'axios'
import Customer from './Customer';
import Message from './Message.js'

class Customers extends Component {
    constructor(props) {
        super();

        this.state = {
            customers: [],
            error: null
        }

        props.reportStatusCallback(null);

    }

    reportStatus = (text) => {
        this.props.reportStatusCallback(text);
      }

    componentDidMount() {

        const getURL = "http://localhost:3002/customers"
    
        axios.get(getURL)
          .then((response) => {
            console.log(response.data);

            const customers = response.data.map((customer) => {
                const customerEntry = {
                    id: customer.id,
                    name: customer.name,
                }

                return customerEntry;
            })

            this.setState({ customers });
          })
          .catch((error) => {
            this.reportStatus(`Uh-oh!  There was a problem: ${error.message}`)
          });
    }

    selectCustomer = (name, id) => {
        this.props.selectCustomerCallback(name, id);
    }

    render() {

        const customerComponents = this.state.customers.map((customer, index) => {
            return (
                <li key={index}>
                   <Customer name={customer.name} id={customer.id} selectCustomerCallback={this.selectCustomer} />
                </li>
            )
        })
        return (
            <div>
              <section>
                <Message message={this.state.message} />
              </section>
              <div>
                { customerComponents }
              </div>
            </div>
        );
    }
}

export default Customers

Customers.propTypes = {
    selectCustomerCallback: PropTypes.func,
    reportStatusCallback: PropTypes.func,
}