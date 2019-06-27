import React, { Component } from "react";
import "./RentalCheckout.css";

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
  };

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
              ? this.props.selectedCustomer
              : "Please select a Customer to checkout"} </p> 
          </h2>
        </header>
        <p>{checkoutRental} </p>
      </div>
    );
  }
}

export default RentalCheckout;
