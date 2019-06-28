import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom'
import './App.css';
import Library from './components/Library'
import CustomerList from './components/CustomerList'
import MovieSearch from './components/MovieSearch'
import Notfound from './notfound'
import Rentals from './components/Rentals'
import image from './images/frontpage.jpg'
import axios from 'axios'

const rentalURL = 'http://localhost:3000/rentals/'

class App extends Component {
  constructor() {
    super();
      this.cleared = {
        rentalCustomerID: null,
        selectedRental: null,
        dueDate: null,
        checkoutDate: null,
      }

      this.state = this.cleared
  }
  
  selectCustomer = (customerID) => {
    console.log('select Customer in App')
    this.setState({rentalCustomerID: customerID})
  }

  clearRentalReservation = () => {
    this.setState({...this.cleared})
  }

  selectRental =(movieTitle) => {
    console.log(movieTitle);
    const rentalDate = Date.now();
    // due in 3 days
    this.setState({
      selectedRental: movieTitle,
      checkoutDate: rentalDate,
      dueDate: rentalDate + 259200000})
  }

  showHomePage() {
    return (
      <div className="container">
        <main>
          <h1>Rewind Movies</h1>
            <img src={image} alt="theater"/>
        </main>
      </div>

    )
  }

  reserveRental = () => {
    const newRental = {
      customer_id: this.state.rentalCustomerID,
      due_date: new Date(this.state.dueDate)
    }
    axios.post(rentalURL + this.state.selectedRental + '/check-out', newRental)
   .then((response) => {
     console.log(response.status)
   })
   .catch((error) => {
     this.setState({errorMessage: error.message})
     console.log(error)
   })
   this.setState({...this.cleared});
   this.clearRentalReservation();
  }
  

  showRentalDetails() {
    return (
      <section className="Snapshot">
        <h3 className="show-title">Current Rental</h3>
          <div>
            <p>Selected Customer: {this.state.rentalCustomerID}</p>
            <p>Selected Movie: {this.state.selectedRental}</p>
            <button onClick={this.reserveRental}>Make Reservation</button>
          </div>
      </section>
    )
  }
  
  render() {
    return (
      <Router>
        <div className="nav-menu">
          <ul className="nav-container">
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="/movies">Rewind Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="/moviesearch">Search Movie Database</Link>
            </li>
            <li className="nav-link">
              <Link to="/customers">Customer Registry</Link>
            </li>
            <li> 
              <Link to="/rental">Movie Rentals </Link>
            </li>
          </ul>
      </div>
        <div className="reservation-float">
          {this.showRentalDetails()}
        </div>
        <Switch>
          <Route exact path="/" render={() => (this.showHomePage())}/> />
          <Route path="/movies" component={Library} />
          <Route path="/moviesearch" component={MovieSearch} />
          <Route path="/customers" render={ (props) => (<CustomerList {...props} selectCustCallback={this.selectCustomer}/>)} />
          <Route path="/rental" render={ (props) => (
            <Rentals {...props} 
              customerID={this.state.rentalCustomerID}
              movie={this.state.selectedRental}
              selectRentalCallback={this.selectRental} 
              clearRentalCallback={this.clearRentalReservation}           
            />)
          } />
          <Route component={Notfound} />
        </Switch>
      </Router>
    );
  }
}

export default App;