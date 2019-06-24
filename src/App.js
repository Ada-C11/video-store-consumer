import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Customers from './components/Customers';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      message: '',
    }
  }

  componentDidMount() {
    // get request for all cards on this board
    const URL = process.env.REACT_APP_API_URL
    console.log(URL);
    axios.get(`${URL}/customers`)
    .then((response) => {
      console.log('hopefully working...')
      const customers = response.data.map((customer) => {
          return customer.name;
      });
      this.setState({ customers: customers });
    })
    .catch((error) => {
      // Show an error
      console.log(error.messages)

      // updating message state
      this.setState({
        message: error.message
      });
    });
  }


  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/customers/">Customers List</Link>
              </li>
            </ul>
          </nav>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            {this.state.customers}
          </p>

          <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
          )} />
          <Route path="/customers" component={Customers} />
        </div>
      </Router>
    );
  }
}

export default App;
