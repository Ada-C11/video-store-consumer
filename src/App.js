import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Search from './components/Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      externalMovies: [],
      customers: [],
      error: null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/movies')
    .then((response) => {
      // console.log(response);
      this.setState({ movies: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });

    axios.get('http://localhost:3001/customers')
    .then((response) => {
      // console.log(response);
      this.setState({ customers: response.data });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });

  }


  render() {

    const errorSection = (this.state.error) ?
    (<section>Error: {this.state.error}</section>) : null;

    return (
      <Router>
        <div>
          <Header />

          <Route exact path="/" component={Home} />
          <Route path="/search" render={() => <Search />}/>
          <Route path="/library" component={Library} />
          <Route path="/customers" component={Customers} />
          {errorSection}
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
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
