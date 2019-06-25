import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import VideoStore from './components/VideoStore'
import Movie from './components/Movie';
import Customer from './components/Customer';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentCustomer: "",
      currentMovie: "",
    }
  }

  currentCustomerCallback = (customer) => {

    return () => {
      this.setState({
        currentCustomer: customer.name,
      })
    }
  }

  render() {
    return (
      <section>

        <Router>
          <div>
            <Header />

            <div className="current_selections">
              {this.state.currentCustomer}
            </div>

            <Route exact path="/" component={Home} />
            <Route path="/customers" render={(routeProps) => (
              <Customer {...routeProps} currentCustomerCallback={this.currentCustomerCallback} />
            )} />
            <Route path="/library" component={Library} />
            <Route path="/search" component={Search} />

          </div>

        </Router>


      </section>
    );
  }
}


function Home() {
  return <VideoStore
    url="http://localhost:3000/"
  />;
}

// function Customers() {
//   return;
// }

function Library() {
  return <Movie />;
}

function Search() {
  return <h2>Search</h2>;
}

function Header(props) {
  return (
    <ul>
      <li>
        <Link to="/">VideoStore</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
      <li>
        <Link to="/library">Library</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
    </ul>

  );

}

export default App;
