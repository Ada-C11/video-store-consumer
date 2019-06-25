import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import PropTypes from 'prop-types';
import Library from './components/Library';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      rentedMovie: undefined,
      customers: [],
    };
  }

  onSelectCallback = (index) => {
    const selectedMovie = this.state.movies[index]
    this.setState({ rentedMovie: selectedMovie });
  }

  componentDidMount() {
    axios.get('http://localhost:3001/movies')
    .then((response) => {
      console.log(response);

      this.setState({ movies: response.data});
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });

    axios.get('http://localhost:3001/customers')
    .then((response) => {
      console.log(response);
      this.setState({ customers: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  render() {
    return (
      <Router>
        <div>
          { this.state.rentedMovie && <p>Movie Selection: {this.state.rentedMovie.title}</p>}
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/library" render={() => <Library library={this.state.movies} onSelectCallback={this.onSelectCallback} />} />
          <Route path="/customers" render={() => <Customers customers={this.state.customers} />} />
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function Search() {
  return <h2>Search</h2>;
}

function Customers() {
  return <h2>Customers</h2>;
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/library">Library</Link>
      </li>
      <li>
        <Link to="/customers">Customers</Link>
      </li>
    </ul>
  );
}

export default App;
