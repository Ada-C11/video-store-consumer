import React, { Component } from 'react';
import axios from 'axios';

class Checkout extends Component {
  constructor (props) {
    super(props);
    this.state = {
      customerName: '',
      customerId: '',
      movieTitle: ''
    }
  }

  updateCustomerName = () => {
    this.setState({
      
    })
  }
  
  checkoutMovie = () => {
    const checkoutUrl = 'http://localhost:4000' + '/rentals/' + `${this.props.selectedMovie}` + '/check-out';
    const queryParams = {
      'customer_id': this.props.selectedCustomerId, 
      'due_date': this.addDays(10),
    }
    axios.post(checkoutUrl, queryParams)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
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
  }

  render() {
    return(
      <div className="checkout-container">
        <div>
          Selected Customer: {this.state.customerName}
        </div>
        <div>
          Selected Movie: {this.state.movieTitle}
        </div>
        <div>
          <button 
            onClick={this.onCheckoutButtonClick}
            className="btn btn-primary"
          >
            Check out
          </button>
        </div>
      </div>
    );
  }
}

export default Checkout;