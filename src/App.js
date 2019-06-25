import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HomePage from './components/HomePage'
import RentalLibraryPage from './components/RentalLibraryPage'
import CustomerListPage from './components/CustomerListPage'
import MovieSearchPage from './components/MovieSearchPage'
import Axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMovie: null,
      selectedCustomer: null
    };
  }

  onSelectCustomer = (customerID) => {
    this.setState({selectedCustomer: customerID});
  }
  onSelectMovie = (movieTitle) => {
    this.setState({selectedMovie: movieTitle});
  }

  onCheckOutClick = () => {
    const url = "http://localhost:3001/movies"
    axios.post()
  }
  
  
  render() {
    const movieSection = (this.state.selectedMovie) ?
      (<section>
        Selected Movie: {this.state.selectedMovie}
      </section>) : null;
    const customerSection = (this.state.selectedCustomer) ?
    (<section>
      Selected Customer: {this.state.selectedCustomer}
    </section>) : null;
    const checkOut = (this.state.selectedCustomer && this.state.selectedMovie) ? 
      (<section>
        <button className="btn btn-primary">Check Out</button>
      </section>) : null;
    return (
      <div>
        {movieSection}
        {customerSection}
        {checkOut}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/library" render={(props) => <RentalLibraryPage onSelectMovieCallback={this.onSelectMovie} />} />
          <Route path="/search" component={MovieSearchPage} />
          <Route path="/customers" render={(props) => <CustomerListPage onSelectCustomerCallback={this.onSelectCustomer} />} />
        </Switch>
    </div>
    );
  }
}

export default App;
