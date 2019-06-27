import React, { Component } from 'react';
import axios from 'axios';
// import './AppRouter.css';

import Movie from './Movie'
import Search from './Search';
import Library from './Library';
import CustomerList from './CustomerList';
import SelectBar from './SelectBar';
import ErrorMessage from './ErrorMessage'

import './AppRouter.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axios from 'axios';

function Index() {
  return <h3>Home</h3>;
}

const VIDEO_STORE_API_URL = 'https://video-store-api-sh.herokuapp.com/';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: null,
      selectedMovie: null,
      errorMessage: '',
      errorStyle: '',
    }
  }

  generateMovieComponents = (movieList, buttonBool, callbackFunction) => {  // secondary bool arg
    return movieList.map((movie, i) => {
      return (
        <Movie
          key={i}
          index={i}
          id={movie.id}
          title={movie.title}
          overview={movie.overview}
          release_date={movie.release_date}
          image_url={movie.image_url}
          inventory={movie.inventory}
          isSelectButton={buttonBool}
          callbackFunction={callbackFunction}

        />
      )
    })
  }

  selectCustomer = (customer) => {
    console.log("selected customer", customer)
    this.setState({
      selectedCustomer: customer,
    })
  }

  selectMovie = (movie) => {
    console.log("selected movie", movie)
    this.setState({
      selectedMovie: movie,
    })
  }

  addErrorMessage = (message, style) => {
    console.log("added error message", message)
    this.setState({
      errorMessage: message,
      errorStyle: style
    })
  }

  checkoutMovie = () => {
    const { selectedMovie, selectedCustomer } = this.state;

    if (selectedMovie && selectedCustomer) {
      console.log(selectedMovie, selectedCustomer);

      const checkoutURL = `${VIDEO_STORE_API_URL}rentals/${selectedMovie.title}/check-out?`;
      const customerID = selectedCustomer.id;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const movie = selectedMovie.title;
      const customer = selectedCustomer.name;

      axios.post(checkoutURL, { due_date: dueDate, customer_id: customerID })
        .then((response) => {
          console.log(`Successfully checked out ${movie}`);
          this.setState({
            selectedMovie: null,
            selectedCustomer: null,
          })
          this.addErrorMessage('Movie successfully checked out!', 'alert-info')
        })
        .catch((error) => {

          this.addErrorMessage(`Unable to check out ${movie} to ${customer}. ${error}`, "alert-warning")
          console.log(`Unable to check out ${movie} to ${customer}. ${error}`);
        })
    } else {
      this.addErrorMessage('Need to select a movie and customer.', "alert-warning")
      console.log(`Need to select a movie and customer.`);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="nav-bar">
            <ul className="nav-list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search Movies</Link>
              </li>
              <li>
                <Link to="/library/">Movie Library</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
              <li>
                <SelectBar
                  className="selected"
                  selectedMovie={this.state.selectedMovie}
                  selectedCustomer={this.state.selectedCustomer}
                  checkoutCallback={this.checkoutMovie}
                />
              </li>
            </ul>


          </nav>

          <main >
            <ErrorMessage
              message={this.state.errorMessage}
              errorStyle={this.state.errorStyle}
              addErrorMessageCallback={this.addErrorMessage} />



            <Route path="/" exact component={Index} />
            <Route
              path="/search/"
              // component={Search} 
              render={(props) =>
                <Search
                  generateMovieComponentsCallback={this.generateMovieComponents}
                  addErrorMessageCallback={this.addErrorMessage}
                  url={VIDEO_STORE_API_URL}
                />}
            />
            <Route
              path="/library/"
              // component={Library}
              render={(props) =>
                <Library
                  generateMovieComponentsCallback={this.generateMovieComponents}
                  url={VIDEO_STORE_API_URL}
                  selectMovieCallback={this.selectMovie}
                  addErrorMessageCallback={this.addErrorMessage}
                />}
            />
            <Route
              path="/customers/"
              render={(props) =>
                <CustomerList
                  url={VIDEO_STORE_API_URL}
                  selectCustomerCallback={this.selectCustomer}
                />}
            />
          </main>
        </div>
      </Router >
    );
  };
};

export default AppRouter;
