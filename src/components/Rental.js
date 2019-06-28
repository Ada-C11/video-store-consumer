import React, { Component } from 'react';
import './Rental.css';
import axios from 'axios';
import './Rental.css';
import PropTypes from 'prop-types';

class Rental extends Component {
    constructor(props) {
        super(props);
    }


    addDays = (date, days) => {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    //   from https://stackoverflow.com/questions/563406/add-days-to-javascript-date


    checkoutMovie = () => {

        const checkoutParams = {
            customer_id: this.props.rentalCustomer.id,
            due_date: this.addDays(Date.now(), 7)
        };

        console.log('Checkout date:', checkoutParams.due_date);


        console.log('selected customer in rental:', checkoutParams.customer_id);

        axios.post(`http://localhost:3000/rentals/${this.props.rentalMovie.title}/check-out`, checkoutParams)
            .then((response) => {


            })
    }

    wrapperCheckoutProcess = () => {

        this.checkoutMovie();
        this.props.clearRentalDetailsCallback();
    }

    render() {
        const { rentalCustomer, rentalMovie } = this.props;

        console.log(this.addDays(Date.now(), 7));

        return (
            

                <div className='rental-info'>
                    <h3>Checkout A Movie</h3>

                    {rentalMovie && <div className="rental-movie">
                        <h4>Movie</h4>
                        <img src={rentalMovie.image_url} alt={`${rentalMovie.title}`} />
                        <div className='rental-movie-title'>{rentalMovie.title}</div>
                        {/* <div className='rental-movie-overview'>{rentalMovie.overview}</div> */}
                        <div className='rental-movie-release-date'>Release Date: {rentalMovie.release_date}</div>
                    </div>}

                    {rentalCustomer && <div className="rental-customer">
                        <h4>Customer</h4>
                        <div><span>ID: </span>{rentalCustomer.id}</div>
                        <div><span>Name: </span>{rentalCustomer.name}</div>
                        <div><span>Phone: </span>{rentalCustomer.phone}</div>
                        <div><span>Credit: </span>${rentalCustomer.account_credit}</div>
                        <div><span>Movies Checkout Out: </span>{rentalCustomer.movies_checked_out_count}</div>
                    </div>}
                    {(rentalCustomer && rentalMovie) && <div>
                        <button type='button' onClick={this.wrapperCheckoutProcess} className="checkout-button">Checkout Movie</button>
                    </div>}
                </div>

           
        )
    }
}


Rental.propTypes = {
    rentalCustomer: PropTypes.object.isRequired,
    rentalMovie: PropTypes.object.isRequired,
    clearRentalDetailsCallback: PropTypes.func.isRequired
};


export default Rental;