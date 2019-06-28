import React, { Component } from 'react';
import axios from 'axios';

import Movie from './components/Movie'
import Search from './components/Search';
import Library from './components/Library';
import CustomerList from './components/CustomerList';
import SelectBar from './components/SelectBar';
import ErrorMessage from './components/ErrorMessage'

import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return(
    <div className="video-store-title">
      <div id="splash">
        Virtual Videos
      </div>
    </div>
  );
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
          inventory={movie.inventory}
          overview={movie.overview}
          release_date={movie.release_date}
          image_url={movie.image_url}
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

      const checkoutURL = `${VIDEO_STORE_API_URL}rentals/${selectedMovie.title}/check-out?`;
      const customerID = selectedCustomer.id;
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const movie = selectedMovie.title;
      const customer = selectedCustomer.name;

      axios.post(checkoutURL, { due_date: dueDate, customer_id: customerID })
        .then((response) => {
          this.setState({
            selectedMovie: null,
            selectedCustomer: null,
          })
          this.addErrorMessage('Movie successfully checked out!', 'alert-info')
        })
        .catch((error) => {

          this.addErrorMessage(`Unable to check out ${movie} to ${customer}. ${error}`, "alert-warning")
        })
    } else {
      this.addErrorMessage('Need to select a movie and customer.', "alert-warning")
    }
  }

  clearSelection = (selection) => {
    selection.title ? this.setState({ selectedMovie: null }) : this.setState({ selectedCustomer: null });
  };

  render() {
    return (
      <Router>
        <div className="App">
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
                  clearSelectionCallback={this.clearSelection}
                />
              </li>
            </ul>


          </nav>

          <main >
            <ErrorMessage
              message={this.state.errorMessage}
              addErrorMessageCallback={this.addErrorMessage}
              errorStyle={this.state.errorStyle} />



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
