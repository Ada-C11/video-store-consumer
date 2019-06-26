import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './components/Search.js'
import Library from './components/Library'

import Customers from './components/Customers.js'

function Index() {
  return <h2>Home</h2>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: '',
      selectedCustomer: ''
    }
  }

  onMovieSelect = (title) => {
    const selectedMovie = title;
    this.setState({selectedMovie})
  }

  onCustomerSelect = (name) => {
    const selectedCustomer = name;

    this.setState({selectedCustomer})
  }

  myCustomersComponent = () => {
    return (
      <Customers
        selectCustomerCallback={this.onCustomerSelect.bind(this)} 
      />
    );
  }

  myLibraryComponent = () => {
    return (
      <Library
        selectMovieCallback={this.onMovieSelect.bind(this)} 
      />
    );
  }

  render() {

    return (
      <Router>
        <div>
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
            <section>
              <div>
                {this.state.selectedMovie.length > 0 &&
                  <p>{this.state.selectedMovie}</p>
                }
              </div>
              <div>
                {this.state.selectedCustomer.length > 0 &&
                  <p>{this.state.selectedCustomer}</p>
                }
              </div>
              <div>
                {
                  this.state.selectedMovie.length > 0 &&
                  this.state.selectedCustomer.length > 0 &&
                  <button>Check Out</button>
                }
              </div>
            </section>
          </nav>
  
          <Route path="/" exact component={Index} />
          <Route path="/search/" component={Search} />
          <Route path="/library/" render={this.myLibraryComponent} />
          <Route path="/customers/" render={this.myCustomersComponent} />
        </div>
      </Router>
    );
  }
}

function AppRouter() {

}

export default App;