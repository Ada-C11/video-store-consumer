import React, { Component } from 'react';
import './Checkout.css';
import axios from 'axios';

class Checkout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      successMessages: [],
      errorMessages: [],
    }
  }
  
  checkoutMovie = () => {
    const movieTitle = this.props.selectedMovie;
    const checkoutUrl = 'http://localhost:4000' + '/rentals/' + `${movieTitle}` + '/check-out';
    const queryParams = {
      'customer_id': this.props.selectedCustomerId, 
      'due_date': this.addDays(10),
    }

    axios.post(checkoutUrl, queryParams)
    .then((response) => {
      console.log(response)
      let successMessages = `Movie: ${movieTitle} was successfully checked out!`
      this.props.refreshList();
      this.props.displayMessages(successMessages);
    })
    .catch((error) => {
      const errorMessages = error.message || error.response
      this.props.displayMessages(errorMessages)
    })
  }

  addDays = (days) => {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  onCheckoutButtonClick = (event) => {
    event.preventDefault();
    this.checkoutMovie();
    this.props.clearSelectedCallback();
  }

  render() {
    return(
      <div className="checkout-container">
        <h5 className="checkout-title">Current selections</h5>
        <div className="checkout-info">
          Customer: {this.props.selectedCustomerName}
        </div>
        <div className="checkout-info">
          Movie: {this.props.selectedMovie}
        </div>
        <div>
          <button 
            onClick={this.onCheckoutButtonClick}
            className="btn btn-info"
          >
            Check out
          </button>
        </div>
      </div>
    );
  }
}

export default Checkout;