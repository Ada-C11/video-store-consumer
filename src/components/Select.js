import React from 'react';
import PropTypes from 'prop-types';
import './Select.css'


const Select = (props) => {
    const { onCheckoutMovie, movie, customer} = props;
    const onRentalClick = () => {
        onCheckoutMovie(customer, movie);
    }

        return (
            <div className="card">
                <div className="card-body">
                    <p className="card-title"><strong>Current Selection</strong></p>
                <p>Customer: {customer ? customer.name: "Please select customer."}</p>
                <p>Movie: {movie ? movie.title: "Please select movie."}</p>
                <button className="btn btn-primary" onClick={ onRentalClick }
                >Reserve Movie</button>
                </div>
            </div>
            
        )
}

Select.propTypes = {
    onCheckoutMovie: PropTypes.func,
    movie: PropTypes.object,
    customer: PropTypes.object,
};

export default Select;
