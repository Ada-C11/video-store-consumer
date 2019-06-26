import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import HomePage from './components/HomePage';
import RentalLibraryPage from './components/RentalLibraryPage';
import CustomerListPage from './components/CustomerListPage';
import MovieSearchPage from './components/MovieSearchPage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMovie: null,
      selectedCustomer: null,
      error: null,
      success:null,
      show: true
    };
  }
  handleHide = () => {
    this.setState({ show: false });
  }
  onSelectCustomer = (customerID) => {
    this.setState({selectedCustomer: customerID});
  }
  onSelectMovie = (movieTitle) => {
    this.setState({selectedMovie: movieTitle});
  }
  onClose() {
    this.setState({hidden:true})
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
          selectedCustomer: null,
          success: response.status,
          show: true
        })
      })
      .catch((error) => {
        this.setState({ 
          error: error.message,
          show: true
        });
      });
  }
  
  
  render() {
    const movieSection = (this.state.selectedMovie) ?
      (<section className="checkoutSection">
        <strong>Selected Movie: </strong>{this.state.selectedMovie}
      </section>) : null;
    
    const customerSection = (this.state.selectedCustomer) ?
    (<section className="checkoutSection">
      <strong>Selected Customer ID: </strong>{this.state.selectedCustomer}
    </section>) : null;
    
    const checkOut = (this.state.selectedCustomer && this.state.selectedMovie) ? 
      (<section className="checkoutSection">
        <button className="btn btn-primary" onClick={this.onCheckOutClick}>Check Out</button>
      </section>) : null;
    
    const errorSection = (this.state.error && this.state.show) ? 
    (<section className="alert alert-danger">
       Error: {this.state.error}
       <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleHide}>
        <span aria-hidden="true">&times;</span>
      </button>
     </section>) : null;
    
    const successSection = (this.state.success && this.state.show) ? 
    (<section className="alert alert-success" >
      Movie was successfully checked out to the customer!
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleHide}>
        <span aria-hidden="true">&times;</span>
      </button>
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
        
        {successSection }
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
