import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Movies from './Movies';
import SearchBar from './SearchBar';
import axios from 'axios';
import { thisExpression } from '@babel/types';
import Customer from './Customer';
import Customers from './Customers';

class VideoStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCustomer: undefined,
      currentMovie: undefined,
      customers: [],
      movies: [],
    }
  }

  customers_url = "https://enigmatic-chamber-40825.herokuapp.com/customers"

  componentDidMount() {
    axios.get(this.customers_url)
    .then(response => {
      console.log(response)
      const customerData = response.data.map(customer => {
        return (
          <Customer
            key={customer.id}
            id={customer.id}
            name={customer.name}
          />
        )
      })
      this.setState({customers: customerData})
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })
  }
  searchCallback = (queryString) => {
    this.setState({ queryString });
  }

  
  
  render() {
    return (
      <Router>
      <div>
        {/* <div>
          <SearchBar searchCallback={this.searchCallback} />
          <Movies queryString={this.props.queryString} />
        </div> */}
          <nav>
            <ul>
            <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search</Link>
              </li>
              <li>
                <Link to="/library/">Library</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
            </ul>
          </nav>
  
        <Route exact path="/" render={() => (
          <Movies
            movies={this.state.movies}
          />
        )}
        />
        {/* <Route path="/search" render={() => ()} />}/> */}

        <Route path="/customers" render={() => (
          <Customers
            customers={this.state.customers}
          />
          )}
        />
        <Route
          path="/library" render={() => (
            <Movies
              movies={this.state.movies}
            />
          )}
        />
        </div>
      </Router>
        );
      }
    
  
}

export default VideoStore;