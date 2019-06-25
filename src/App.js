import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import RentalLibraryPage from './components/RentalLibraryPage'
import CustomerListPage from './components/CustomerListPage'
import MovieSearchPage from './components/MovieSearchPage'

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
  onSelectMovie = (movieInfo) => {
    this.setState({selectedMovie: movieInfo});
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
    return (
      <div>
        {movieSection}
        {customerSection}
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
