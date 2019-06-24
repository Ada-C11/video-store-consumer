import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); 
    
    this.state = {
      movieLibrary: [],
      customerList: [],
      selectedMovie: null,
      selectedCustotmer: null,
    }
  }

  addMovieToLibrary = () => {

  }

  selectMovie = () => {

  }

  selectCustomer = () => {

  }

 // Api call to get single movie

 // Api call to get all movies

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
