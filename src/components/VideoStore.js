import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieLibrary from './MovieLibrary';
import Customer from './Customer';
import axios from 'axios';


class VideoStore extends Component {
    constructor() {
        super();

        this.state = {
            currentMovie: "",
            currentCustomer: 0,
            customers: [],
        };
    }

    componentDidMount() {
        const fullUrl = "http://localhost:3000/customers"
        axios.get(fullUrl)
            .then((response) => {
                const customers = response.data.map((customer) => {
                    const { id, name, city, address, postal_code, phone, account_credit, movies_checked_out_count } = customer;
                    const newCustomer = {
                        id: id,
                        name: name,
                        city: city,
                        address: address,
                        postal_code: postal_code,
                        phone: phone,
                        account_credit: account_credit,
                        movies_checked_out_count: movies_checked_out_count,
                    }
                    return newCustomer;
                })

                this.setState({ customers });

            })
            .catch((error) => {
                this.setState({ errorMessages: error.message });
            });
    }

    currentCustomerCallback = (id) => {
        this.setState({
            currentCustomer: id,
        })
    }

    currentMovieCallback = (movie) => {
        this.setState({
            currentMovie: movie,
        })
    }

    render() {
        const displayCustomers = this.state.customers.map((customer) => {
            const { id, name } = customer;
            return (<Customer id={id} name={name} key={id} />)
        })
        return (

            <section className="movielibrary-button">
                <section className="customer_list">
                    {displayCustomers}
                </section>
                <MovieLibrary
                    currentMovieCallback={this.currentMovieCallback}
                    currentCustomerCallback={this.currentCustomerCallback}
                />
            </section>
        );
    }
}

export default VideoStore;