import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'

class App extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/" component={HomePage} />
      {/* <Route path="/movies" component={MoviesPage} />
      <Route path="/customers" component={CustomersPage} /> */}
    </Switch>
    );
  }
}

export default App;
