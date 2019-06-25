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
      selectedMovie: null,
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

      const movies = response2.data.map((apiObject) => {
        return apiObject;
      })

      console.log(customers);

      this.setState({ 
        customers: customers, 
        movies: movies
      });
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
    return axios.get(`${URL}/customers`);
  }

  getMovies() {
    return axios.get(`${URL}/movies`);
  }

  onSelectMovie = (movie) => {
    // let currentSelectedMovie = this.state.selectedMovie;
    // currentSelectedMovie = movie;

    this.setState({ 
      selectedMovie: movie
    });

    console.log('im in app and the movie clicked was:', movie.title)
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
                <Link to='/library/'>Movie Library</Link>
              </li>
            </ul>
          </nav>

          {this.state.selectedMovie && <div className='currently-selected-items'>
            <p>Selected Movie: {this.state.selectedMovie.title}</p>
    
          </div>}
        
          <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
          )} />
          <Route path="/customers" render={(props) => <Customers {...props} customerList={this.state.customers} /> } />
          <Route path="/library" render={(props) => <Movies {...props} movieList={this.state.movies} onSelectMovieCallback={this.onSelectMovie}/> } />
        </div>
      </Router>
    );
  }
}

export default App;
