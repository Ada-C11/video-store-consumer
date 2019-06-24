import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import MoviesPage from './components/MoviesPage'
import CustomersPage from './components/CustomersPage'
import MoviesSearchPage from './components/MoviesSearchPage'

class App extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/movies" component={MoviesPage} />
      <Route path="/movies/search" component={MoviesSearchPage} />
      <Route path="/customers" component={CustomersPage} />
    </Switch>
    );
  }
}

export default App;
