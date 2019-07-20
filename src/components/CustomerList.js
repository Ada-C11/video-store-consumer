
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customers: [],
            errorMessage: null,
        }
    }

    componentDidMount() {
        const customersURL = 'http://localhost:3001/customers';
        axios.get(customersURL)
            .then((response) => {
                const customers = response.data.map((custInfo) => {
                  // const { id, name, registered_at, address, city, state, postal_code, phone, account_credit } = custInfo;
                    return {
                      id: custInfo.id,
                      name: custInfo.name,// string
                      registered_at: custInfo.registered_at, // Date
                      address: custInfo.address, // string
                      city: custInfo.city, //string
                      state: custInfo.state, // string
                      postal_code: custInfo.postal_code, // string
                      phone: custInfo.phone, // string
                      account_credit: custInfo.account_credit, // number
                    }
                })
                this.setState({
                    customers
                });
            })
            .catch((error) => {
               console.log(error.message)
            });
    }
        handleCustomerSelection = customer => {
            console.log('in handle customer selection:', customer);
            this.props.selectedCustomerCallback(
                customer.name,
                customer.id
            );
            console.log(customer)
        }
    render() {
       const renderedCustomers = this.state.customers.map((customer, i) => {
           return (

           <div className="customer_card"key={i}>
               <ul>
               <li id="title" className="movie_info"> {customer.name} </li>
            <li>{customer.address}</li>
            <button className="most_btns" onClick={()=>this.handleCustomerSelection(customer)}>Select</button>
            </ul>
           </div>

            )
       })

        return (
            <section>
                <h1>Customers </h1>
            <div className="customer_container">
                {renderedCustomers}
            </div>
            </section>
        )
    }

}

export default CustomerList;
