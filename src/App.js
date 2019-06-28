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
          setTimeout(() => {
            this.setState({
              statusMessage: ""
            });
          }, 10000)
        }
      })
      .catch((error) => {
        this.setState({ errorMessages: error.message });
        console.log(this.state.errorMessages)
      });
  }

  showRentalSection = () => {
    const showButton = this.state.currentMovie && this.state.currentCustomer;
    const checkoutButton = <button
      onClick={this.checkoutButtonClick}>Checkout</button>;
    
    if (this.state.currentCustomer || this.state.currentMovie) {
      return (
        <div className="current_selections">
          <p><strong>Selected Customer:</strong> {this.state.currentCustomer.name}</p>
          <p><strong>Selected Movie:</strong> {this.state.currentMovie.title}</p>

          {showButton ? checkoutButton : ""}
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
        {this.state.statusMessage}
      </div>;

    return (
      <section className="site_container">
        <Router>
          <Header />

          {this.showRentalSection()}
          {statusMessage}
          <div className="site_content_container">
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

        <Footer />

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand">VHS Video</Link>
      <ul className="navbar-nav" >
        <li className="nav-item">
          <Link to="/customers" className="nav-link">Customers</Link>
        </li>
        <li className="nav-item">
          <Link to="/library" className="nav-link">Movie Library</Link>
        </li>
        <li className="nav-item">
          <Link to="/search" className="nav-link">Search</Link>
        </li>
      </ul>
    </nav>

  );
}

function Footer() {
  return (
    <footer>
      <p className="heart">&hearts;</p>
      <p>Riyo Perry + Amy Phung</p>
      <p><a href="adadevelopersacademy.org"></a>Ada Developers Academy | C11</p>
      <p>06.27.19</p>
    </footer>
  )
}

export default App;
