import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './components/CustomerList';
import RentalLibrary from './components/RentalLibrary';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMovie: "",
      selectedCustomer: "",
      allRentals: [],
      customerList: [],
    }
  }

  getCustomers = (customers) => {
    this.setState( {customerList: customers})
  }

  onSelectCustomer = (customerId) => {
    const customer = this.state.customerList.find(customer => customer.id === customerId);
    this.setState({selectedCustomer: customer});
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
            {/* <Search /> */}
                <li>
                    <Link to="/movies" className="movies">Movies</Link>
                  </li>
                <li>
                  <Link to="/customers" className="customers">Customers</Link>
                </li>
              </ul>
            </nav>
          </div>
          <main>
            <Route path="/movies" component={RentalLibrary} />
            <Route 
              path="/customers" 
              render={(props) => <CustomerList {...props} selectCustomerCallback={this.onSelectCustomer} getCustomerCallback={this.getCustomers}/>}
            />
          </main>
        </Router>
      </div>
    );
  }
}

export default App;


