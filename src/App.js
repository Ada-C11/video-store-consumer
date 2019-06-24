import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/library" component={Library} />
          <Route path="/customers" component={Customers} />
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

function Library() {
  return <h2>Library</h2>;
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
