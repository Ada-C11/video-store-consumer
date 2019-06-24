import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieSearch />
        <MovieLibrary />
        <CustomerList />
      </div>
    );
  }
}

export default App;
