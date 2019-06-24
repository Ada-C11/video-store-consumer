import React, { Component } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage'
import RentalLibraryPage from './components/RentalLibraryPage'
import CustomerListPage from './components/CustomerListPage'
import MovieSearchPage from './components/MovieSearchPage'

class App extends Component {
  render() {
    return (
      <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/library" component={RentalLibraryPage} />
      <Route path="/search" component={MovieSearchPage} />
      <Route path="/customers" component={CustomerListPage} />
    </Switch>
    );
  }
}

export default App;
