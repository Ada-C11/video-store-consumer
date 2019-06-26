import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Movie from './components/Movie';
import Customer from './components/Customer';
import Search from './components/Search';


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
        currentCustomer: customer,
      })
    }
  }

  currentMovieCallback = (movie) => {

    return () => {
      this.setState({
        currentMovie: movie,
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
              <p>{this.state.currentCustomer.name}</p>
              <p>{this.state.currentMovie.title}</p>
            </div>

            {/* <Route exact path="/" component={} /> */}
            <Route
              path="/customers"
              render={(routeProps) => (
                <Customer {...routeProps}
                  currentCustomerCallback={this.currentCustomerCallback} />
              )}
            />
            <Route
              path="/library"
              render={(routeProps) => (
                <Movie {...routeProps}
                  currentMovieCallback={this.currentMovieCallback} />
              )} />
            <Route path="/search" component={Search} />

          </div>

        </Router>
        <h3>Welcome to the Video Store</h3>

      </section>
    );
  }
}


function MovieSearch() {
  return <Search />;
}

function Header() {
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
