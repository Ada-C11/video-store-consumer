import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Customers from './components/Customers';
import Movies from './components/Movies';

const URL = process.env.REACT_APP_API_URL

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      movies: [],
      message: '',
    }
  }

  componentDidMount() {
    
    axios.all([this.getCustomers(), this.getMovies()])
    .then(([response1, response2]) => {
      // const customers = response1.data
      // const movies = response2.data
      console.log(response1)
      // const customers = this.mapApiResponse(response1);
      // const movies = this.mapApiResponse(response2);

      const customers = response1.data.map((apiObject) => {
        // console.log(apiObject);
        return apiObject;
      });

      console.log(customers);

      this.setState({ customers: customers, });
      // console.log(this.state.customers)
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

  getCustomers() {
    return axios.get(`http://localhost:3000/customers`);
  }

  getMovies() {
    return axios.get(`http://localhost:3000/movies`);
  }

  // mapApiResponse(response) {
  //   return response.data.map((apiObject) => {
  //     // console.log(apiObject);
  //     return apiObject;
  //   });
  // }

  render() {
    return (
      <Router>
        <div className="App">
      
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/customers/">Customers List</Link>
              </li>
              <li>
                <Link to='/movies/'>Movie Library</Link>
              </li>
            </ul>
          </nav>
        
          <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
          )} />
          <Route path="/customers" render={(props) => <Customers {...props} customerList={this.state.customers} /> } />
          <Route path="/movies" render={(props) => <Movies {...props} movieList={this.state.movies} /> } />
        </div>
      </Router>
    );
  }
}

export default App;
