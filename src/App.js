import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
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
      selectedCustomer: null,
      error: null
    };
  }

  onSelectCustomer = (customerID) => {
    this.setState({selectedCustomer: customerID});
  }
  onSelectMovie = (movieTitle) => {
    this.setState({selectedMovie: movieTitle});
  }
  
  onCheckOutClick = () => {
    let d=new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));
    let dueDate = d.toJSON().slice(0,10)
    
    const rentalInfo = {
      customer_id: this.state.selectedCustomer,
      due_date: dueDate
    }
    
    const url = "http://localhost:3001/rentals/"+this.state.selectedMovie+"/check-out"
    
    axios.post(url, rentalInfo)
      .then((response) => {
        this.setState({
          selectedMovie: null,
          selectedCustomer: null
        })
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
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
        <button className="btn btn-primary" onClick={this.onCheckOutClick}>Check Out</button>
      </section>) : null;
    
    const errorSection = (this.state.error) ? 
    (<section className="alert alert-danger">
       Error: {this.state.error}
     </section>) : null;
    
    return (
      <div>
        <div className="navbar navbar-expand-lg navbar-dark bg-success">
          <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/" className="navbar-brand">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/customers" className="nav-link">Customers</Link>
          </li>
          <li className="nav-item">
            <Link to="/library" className="nav-link">Movie Rental Library</Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-link">Search for a Movie</Link>
          </li>
          </ul>
        </div>
        {errorSection}
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
