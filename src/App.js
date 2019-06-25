import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import CustomerList from './components/CustomerList';
import Movies from './components/Movies';

const URL = process.env.REACT_APP_API_URL

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      movies: [],
      selectedMovie: null,
      selectedCustomer: null,
      message: '',
    }
  }

  componentDidMount() {
    
    axios.all([this.getCustomers(), this.getMovies()])
    .then(([response1, response2]) => {
      // const customers = response1.data
      // const movies = response2.data
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

  onSelectCustomer = (customer) => {

      this.setState({
        selectedCustomer: customer
      });
  }

  onClickUnselect = (unselect) => {
    const updatedState = {};
    updatedState[unselect] = null;

    this.setState(updatedState);
  }


  render() {
    return (
      <Router>
        <body className="App">
          <header>
            <h1>Last Resort Video Store</h1>
          </header>
      
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/customers/">Customer List</Link>
              </li>
              <li>
                <Link to='/library/'>Movie Library</Link>
              </li>
            </ul>
          </nav>

          <div className='currently-selected-items'>  
               
          {this.state.selectedMovie && 
            <div className='currently-selected-items'>
              <p>Selected Movie: {this.state.selectedMovie.title}</p>
              <button onClick={() => { this.setState({ selectedMovie: null}) }}>Remove Movie from Rental</button>
            </div>
          }
          {this.state.selectedCustomer &&
              <p>Selected Customer: {this.state.selectedCustomer.name}</p>
              <button onClick={() => { this.setState({ selectedCustomer: null}) }}>Unselect</button>
            }

          </div>
        
          <Route exact={true} path="/" render={() => (
            <h1>Welcome</h1>
          )} />
          <Route path="/customers" render={(props) => <CustomerList {...props} customers={this.state.customers} onSelectCustomerCallback={this.onSelectCustomer} /> } />
          <Route path="/library" render={(props) => <Movies {...props} movieList={this.state.movies} onSelectMovieCallback={this.onSelectMovie} /> } />
        </body>
      </Router>
    );
  }
}

export default App;
