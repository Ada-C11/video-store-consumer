import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import Navbar from '../Navbar';
import SelectedInfo from '../components/SelectedInfo'
import Customer from '../components/Customer.js';
import CustomerList from '../components/CustomerList.js';
import Search from '../components/Search';
import { withRouter } from "react-router";
import MovieList from '../components/MovieList.js';
import StickerBoard from '../components/StickerBoard.js';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentCustomer: "none",
        currentCustomerId: 0,
        currentMovie: "none",
    };
  }
   
  movieToRent = (movieName) => {
    console.log(`Current Movie = ${movieName}`);
    this.setState({
      currentMovie: movieName,
    });
  }

  customerRenting = (customer) => {
    console.log(customer.name, customer.id)
    this.setState({
      currentCustomer: customer.name,
      currentCustomerId: customer.id,
    });
  }

  render() {
    return (
        <div>
          <header className="App-header">
            <img src={"https://i.ibb.co/6PZqtHk/Screen-Shot-2019-07-19-at-11-22-08-AM.png"} className="App-logo" alt="chalkboard" />
            <h1 className="App-title">
            <img src={"https://i.ibb.co/TvRxPGd/eb822bd15530836fa9508123006bd24a.png"} className="App-title" alt="Sticker Star" /></h1>
            <SelectedInfo customer={this.state.currentCustomer} movie={this.state.currentMovie}/>
          </header>
          <Navbar customer={this.state.currentCustomer} customerId={this.state.currentCustomerId} movie={this.state.currentMovie}/>    
          <StickerBoard/>  
          <div>
            <Route exact path="/" render={ (routerprops) => <MovieList {...routerprops}
            movieTitleCallbackinMovieList={this.movieToRent } /> }
            />
            <Route exact path="/customers"
            render={ (routerprops) => <CustomerList {...routerprops}
            customerNameCallbackCustomers={this.customerRenting} /> }
            />
            <Route path="/search" component={(routerProps) => <Search {...routerProps} />}/>
          </div>
        </div>
    );
  }
}

export default withRouter(Home);