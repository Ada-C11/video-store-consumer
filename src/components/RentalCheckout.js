import React, { Component } from "react";
import "./RentalCheckout.css";
import axios from "axios";

class RentalCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkout: {}
    };
  }

  checkout = (movie, customer) => {
    this.setState({
      checkout: { customer: customer, movie: movie }
    });
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    axios
      .post(`http://localhost:3001/rentals/${movie.title}/check-out`, {
        customer_id: customer.id,
        due_date: dueDate
      })
      .then(response => {
        return response.data;
      })

      .catch(error => {
        alert("Error happened");
        this.setState({ error: error.message });
      });

    this.props.hasCheckedOutCallback(movie, customer);
  };

  render() {
    let checkoutText = "";

    if (this.props.checkoutStatus) {
      checkoutText = `${
        this.state.checkout.customer.name
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
        <header>
          <h2>
            <p>
              {this.props.selectedMovie
                ? this.props.selectedMovie.title
                : "Please select Movie to checkout"}
            </p>
            <p>
              {this.props.selectedCustomer
                ? this.props.selectedCustomer.name
                : "Please select a Customer to checkout"}{" "}
            </p>
          </h2>
        </header>
        <p>{checkoutRental} </p>
        <p>{checkoutText} </p>
      </div>
    );
  }
}

export default RentalCheckout;
