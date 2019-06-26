import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import VideoStore from './components/VideoStore'
import Movie from './components/Movie';
import Customer from './components/Customer';
import Search from './components/Search';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentCustomer: "",
      currentMovie: "",
    }
  }

  checkoutButtonClick = () => {
    const title = this.state.currentMovie.title;
    const customer = this.state.currentCustomer;
    const rentalUrl = "http://localhost:3000/rentals" + title + "/check-out";


    if (this.state.currentCustomer === "" || this.state.currentMovie === "") {
      return (<p>Please select a movie AND a customer.</p>)
    } else {

      axios.post(rentalUrl)
        .then((response) => {
          console.log(response)
          this.state.currentCustomer.movies_checked_out_count += 1;
        })
        .catch((error) => {
          this.setState({ errorMessages: error.message });
          console.log(this.state.errorMessages)
        });
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
        return (
          <section>

            <Router>
              <div>
                <Header />

                <div className="current_selections">
                  <p><strong>Selected Customer:</strong>{this.state.currentCustomer.name}</p>
                  <p><strong>Selected Movie:</strong> {this.state.currentMovie.title}</p>

                  <button className="checkout_button"
                onClick={this.checkoutButtonClick}>Checkout</button>
                </div>

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
                <Route path="/search" component={Search} />

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

    // function MovieSearch() {
    //   return <Search />;
    // }

    function Header() {
      return (
        <ul>
          <li>
            <Link to="/">VideoStore</Link>
          </li>
          <li>
            <Link to="/customers">Customers</Link>
          </li>
          <li>
            <Link to="/library">Library</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>

      );

    }

    export default App;
