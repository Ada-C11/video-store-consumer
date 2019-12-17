import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import CustomerCollection from './CustomerCollection';
import Library from './Library';
import Search from './Search';
// import {getCurrentDate} from './utils';

import './NavBar.css';

class NavBar extends Component {
    constructor() {
      super();
  
      this.state = {
        movies: [],
        errorMessage: null,
        confirmationMessage: null,
        customers: [],
        selectedCustomer: null,
        selectedMovie: null,
        confirmation: null,
      };
    }

    onSelectCustomer = (customerId) => {
      // console.log(this.state.customers)
      // console.log(customerId);
      const customer = this.state.customers.find(customer => customer.id === customerId)
      console.log(customer);
      this.setState({
          selectedCustomer: customer
      });
      console.log(customer.name)
    }

    onSelectMovie = (movieId) => {
      const movie = this.state.movies.find(movie => movie.id === movieId)
      console.log(movie);
      this.setState({
          selectedMovie: movie
      });
    }


    componentDidMount() {
      const localUrl = 'http://localhost:3007/movies'
      console.log(localUrl);
      axios.get(localUrl)
        .then((response) => {
        this.setState({ 
          movies: response.data,
            })
        })
        .catch((error) => {
        this.setState({ errorMessage: error.message });
        });
      const localUrl2 = 'http://localhost:3007/customers'
      axios.get(localUrl2)
        .then((response) => {
        console.log("in axios!");
        console.log(response.data)
        let updatedCustomers = response.data;
            this.setState({             
                customers: updatedCustomers,
            })
        })
        .catch((error) => {
        this.setState({ errorMessage: error.message });
        });    
    }

    // can you return html/jsx outside the render/return?
    checkOutMovie = () => {
        console.log("heeeeere")
        const due_date = new Date();
        due_date.setDate(due_date.getDate() + 7);
        console.log(due_date);
            const postURL = 'http://localhost:3007/rentals/' + this.state.selectedMovie.title + '/check-out?due_date=' + due_date + '&customer_id=' + this.state.selectedCustomer.id;
            console.log(postURL);
            
            axios.post(postURL)
            .then((response) => {
              console.log("This is what response.data looks like from the API on a successful response", response.data)

              this.setState({
                confirmationMessage: `${ this.state.selectedMovie.title } has been successfully checked out by ${ this.state.selectedCustomer.name }`,
                errorMessage: null
                });

            })
            
            .catch((error) => {
  
                console.log(error.response.data.errors.movie)

              this.setState({
                errorMessage: error.response.data.errors.movie,
                confirmationMessage: null
              });
            });

    }
    
    addMovie = (movie) => {
      this.setState({
        movies: [...this.state.movies, movie]
      })
    }
  
  render() {
      // fix the error message to work on both
    const confirmationSection = (this.state.confirmationMessage) ?
    (<section>
        { this.state.confirmationMessage }
    </section>) : null;    
    const errorSection = (this.state.errorMessage) ? 
    (<section>
       Check out failed: { this.state.selectedMovie.title } {this.state.errorMessage} { this.state.selectedCustomer.name }
     </section>) : null;
    const customerSelected = (this.state.selectedCustomer) ? 
    (<section>
       <p>selected customer is: {this.state.selectedCustomer.name}</p>
     </section>) : null;
    
    const movieSelected = (this.state.selectedMovie) ? 
    (<section>
       <p>selected movie is: {this.state.selectedMovie.title}</p>
     </section>) : null;



// 
    return (
    <Router>
      <div>
        <li>{this.props.allMovies} </li>
        <li>{this.props.allCustomers}</li>
        <li>{this.props.search}</li>
      </div>
      <div>
        { customerSelected }
        { movieSelected }
        { (movieSelected !== null && customerSelected !== null) && 
                <button 
                    onClick={() => this.checkOutMovie()}>
                    Check out movie
                </button>
        }
        { errorSection }
        { confirmationSection }
      </div>
      <Route path="/customers/" render={(props) => (
          <CustomerCollection 
          onSelectCustomerCallback={this.onSelectCustomer}
          customers={this.state.customers}
          />
      )}/>
      
      <Route path="/library/" render={(props) => (
          <Library
          onSelectMovieCallback={this.onSelectMovie}
          movies={this.state.movies} 
          />
      )}/>
      <Route path="/search/" render={(props) => (
          <Search
          addMovieCallback={this.addMovie}
        />
      )}/>
    </Router>
    )
  }
}

NavBar.propTypes = {

};

export default NavBar;