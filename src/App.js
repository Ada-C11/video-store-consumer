import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import CustomerList from './components/CustomerList';
import Library from './components/Library';
import Selected from './components/Selected';
import SearchTMDB from './components/SearchTMDB';
import Home from './components/Home';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends Component {

  constructor() {
    super();

    this.state = {
        selectedMovie: '',
        selectedCustomer: '',
        selectedCustomerId: null,
        message: '',

    }
}

selectedMovieObject = (movie) => {
  this.setState({
    selectedMovie: movie,
  })

}
selectedCustomerObject = (customer, id) => {
  this.setState({
    selectedCustomer: customer,
    selectedCustomerId: id
  })

}
  render() {
    return (
      <section>

      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
              <li>
                <Link className="navbar-brand" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customers">Customer List</Link>
              </li>
              <li>
                <Link className="nav-link" to="/library">Movies</Link>
              </li>

            </ul>
          </nav>

          <div  >

          <Selected showMovie={this.state.selectedMovie}
                showCustomer={this.state.selectedCustomer}
                showCustomerId={this.state.selectedCustomerId}/>
          </div>
          <Route path="/home" component={Home}/>
          <Route path="/search" component={SearchTMDB}/>
          <Route path="/customers"
          render={(props) =>
            <CustomerList
            selectedCustomerCallback={this.selectedCustomerObject}
            isAuthed={true}
            />
          }
          />
          <Route path="/library"
          render={(props) =>
            <Library selectedMovieCallback={this.selectedMovieObject}
            isAuthed={true}
            />
          }
          />
        </div>
      </Router>

      </section>
    );
  }
}

export default App;
