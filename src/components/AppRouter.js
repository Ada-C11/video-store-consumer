import React, { Component } from 'react';
import axios from 'axios';
// import './AppRouter.css';

import Movie from './Movie'
import Search from './Search';
import Library from './Library';
import CustomerList from './CustomerList';
import SelectBar from './SelectBar';

import './AppRouter.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Axios from 'axios';

function Index() {
  return <h2>Home</h2>;
}

const VIDEO_STORE_API_URL = 'https://video-store-api-sh.herokuapp.com/';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: null,
      selectedMovie: null,
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
            selectMovie: null,
            selectCustomer: null,
          })
        })
        .catch((error) => {
          console.log(`Unable to check out ${movie} to ${customer}. ${error}`);
        })
    } else {
      console.log(`Need to select a movie and customer.`);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="nav-bar">
            <ul>
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

            </ul>
            <SelectBar

              selectedMovie={this.state.selectedMovie}
              selectedCustomer={this.state.selectedCustomer}
              checkoutCallback={this.checkoutMovie}
            />


          </nav>

          <main >


            <Route path="/" exact component={Index} />
            <Route
              path="/search/"
              // component={Search} 
              render={(props) =>
                <Search
                  generateMovieComponentsCallback={this.generateMovieComponents}
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
