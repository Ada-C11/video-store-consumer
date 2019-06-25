import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import VideoStore from './components/VideoStore'
import MovieLibrary from './components/MovieLibrary';


function App() {
  return (
    <section>
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/customers" component={Customers} />
          <Route path="/library" component={Library} />
          <Route path="/search" component={Search} />

        </div>
      </Router>


    </section>
  );
}


function Home() {
  return <VideoStore url="http://localhost:3000/" />;
}

function Customers() {
  return <h2>Customers</h2>;
}

function Library() {
  return <h2>Library</h2>;
}

function Search() {
  return <h2>Search</h2>;
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
