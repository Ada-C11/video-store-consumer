import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  

  Index = () => {
    return <h2>Home</h2>;
  }

  About = () => {
    return <h2>About</h2>;
  }

  Users = () => {
    return <h2>Users</h2>;
  }

  render() {
  return (
    <div>
      <Router >
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/movies/">All Movies</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
            </ul>
          </nav>

          {/* <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} /> */}
        </div>
      </Router>
    </div>
  );
  }
}

export default App;


