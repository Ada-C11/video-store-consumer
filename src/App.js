import React, { Component } from "react";
import "./App.css";
import MovieLibrary from "./components/MovieLibrary";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">BitaRos Amazing VideoStore</h1>
        </header>
        {/* <MovieSearch /> */}
        <MovieLibrary />
        {/* <CustomerList /> */}
      </div>
    );
  }
}

export default App;
