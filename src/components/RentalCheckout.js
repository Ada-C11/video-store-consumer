import React, { Component } from "react";
import "./RentalCheckout.css";
import axios from "axios"

class RentalCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: {},
      checkoutStatus: false
    };
  }

  checkout = (movie, customer) => {
    this.setState({
      checkout: { customer: customer, movie: movie },
      checkoutStatus: true
    });
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7)
    console.log(dueDate)
    
    axios.post(`http://localhost:3001/rentals/${movie.title}/check-out`, { customer_id: customer.id, due_date: dueDate})
      .then((response) => {
        return response.data
      })
       
      .catch((error) => {

        console.log(error.messages)
        alert('Error happened');
        this.setState({ error: error.message });
      })
  }

  render() {
    let checkoutText = "";

    if (this.state.checkoutStatus) {
      checkoutText = `${
        this.state.checkout.customer
      } has check out the following movie: ${this.state.checkout.movie.title}`;
    }

    const checkoutRental =
      this.props.selectedCustomer && this.props.selectedMovie ? (
        <button
          type="button"
          className="btn btn-danger"
          aria-label="Close"
          onClick={() =>
            this.checkout(this.props.selectedMovie, this.props.selectedCustomer)
          }
        >
          Checkout
        </button>
      ) : null;

    return (
      <div>
        <p>{checkoutText} </p>

        <header className="App__header">
          <h2>
            <p>
              {this.props.selectedMovie
                ? this.props.selectedMovie.title
                : "Please select Movie to checkout"}
            </p>
            <p>{this.props.selectedCustomer
              ? this.props.selectedCustomer.name
              : "Please select a Customer to checkout"} </p> 
          </h2>
        </header>
        <p>{checkoutRental} </p>
      </div>
    );
  }
}

export default RentalCheckout;
