import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import VideoStore from './components/VideoStore'
import Movie from './components/Movie';
import Customer from './components/Customer';
import Search from './components/Search';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCustomer: "",
      currentMovie: "",
      statusMessage: "",
    }
  }

  resetSelections = () => {
    this.setState({
      currentCustomer: "",
      currentMovie: "",
    })
  }

  checkoutButtonClick = () => {
    const movie = this.state.currentMovie
    const customer = this.state.currentCustomer;
    const dueDate = Date.now() + 604800000
    const rentalUrl = "http://localhost:3000/rentals/" + movie.title + "/check-out";

    const newRental = {
      customer_id: customer.id,
      title: movie.title,
      due_date: new Date(dueDate),
    }


    axios.post(rentalUrl, newRental)
      .then((response) => {
        console.log(response)
        customer.movies_checked_out_count += 1;
        this.resetSelections();
        if (response.status === 200) {
          this.setState({ statusMessage: "Successfully checked out movie!" })
        }
      })
      .catch((error) => {
        this.setState({ errorMessages: error.message });
        console.log(this.state.errorMessages)
      });
  }

  showButton = () => {
    if (this.state.currentMovie && this.state.currentCustomer) {
      return true;
    }
  }

  showRentalSection = () => {
    if (this.state.currentCustomer || this.state.currentMovie) {
      return (
        <div className="current_selections">
          <p><strong>Selected Customer:</strong> {this.state.currentCustomer.name}</p>
          <p><strong>Selected Movie:</strong> {this.state.currentMovie.title}</p>

          <button className="checkout_button"
            onClick={this.checkoutButtonClick}
            disabled={this.showButton ? false : true}>Checkout</button>
        </div>
      )
    }
  }

  currentCustomerCallback = (customer) => {
    return () => {
      this.setState({
        currentCustomer: customer,
      })
    }
  }

  currentMovieCallback = (movie) => {
    return () => {
      this.setState({
        currentMovie: movie,
      })
    }
  }

  render() {
    const statusMessage =
      <div className="status_message">
        <p>{this.state.statusMessage}</p>
      </div>;

    return (
      <section>

        <Router>
          <div>
            <Header />

            {this.showRentalSection()}
            {statusMessage}

            <Route exact path="/" component={Home} />
            <Route
              path="/customers"
              render={(routeProps) => (
                <Customer {...routeProps}
                  currentCustomerCallback={this.currentCustomerCallback} />
              )}
            />
            <Route
              path="/library"
              render={(routeProps) => (
                <Movie {...routeProps}
                  currentMovieCallback={this.currentMovieCallback} />
              )} />
            <Route path="/search"
              render={(routeProps) => (
                <Search {...routeProps} />
              )} />

          </div>

        </Router>


      </section>
    );
  }
}


function Home() {
  return <VideoStore
  />;
}

function Header() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand">
        <Link to="/">VideoStore</Link>
      </a>
      <ul className="navbar-nav" >
        <li className="nav-item">
          <a className="nav-link">
            <Link to="/customers">Customers</Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Link to="/library">Library</Link>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <Link to="/search">Search</Link>
          </a>
        </li>
      </ul>
    </nav>

  );

}

export default App;
