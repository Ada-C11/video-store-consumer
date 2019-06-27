import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import SearchMovie from './components/SearchMovie';
import CustomerList from './components/CustomerList';
import MovieList from './components/MovieList';

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

      const customers = response1.data.map((apiObject) => {
        return apiObject;
      });

      const movies = response2.data.map((apiObject) => {
        return apiObject;
      })

      this.setState({ 
        customers: customers, 
        movies: movies
      });

    })
    .catch((error) => {
      console.log(error.messages)

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
      this.setState({ 
        selectedMovie: movie
      });
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

  onClickCheckout = () => {

    this.addRental(this.state.selectedMovie, this.state.selectedCustomer)
    
    const updatedState = null

    this.setState({
      selectedMovie: updatedState,
      selectedCustomer: updatedState,
      message: '',
    });
  }

  addRental = (movie, customer) => {

    const dueDate = new Date ();
    dueDate.setDate(dueDate.getDate() + 5);

    const rentalDataForApi = {
      movie: movie.title,
      customer_id: customer.id,
      due_date: dueDate
    };

    const RENTAL_URL = `${URL}/rentals/${movie.title}/check-out`;

    axios.post(RENTAL_URL, rentalDataForApi) 
      .then((response) => {

        this.setState({
          message: `${movie.title} succesfully checked out to ${customer.name}`
        });
        
      })
      .catch((error) => {
        console.log(error.messages);
    
        this.setState({
          message: error.message
        });
      });
  }

  addSearchToLibrary = (movie) => {
    
    axios.post(`${URL}/movies`, movie)
      .then((response) => {
        let currentMovieList = this.state.movies;
        currentMovieList.push(movie)

        this.setState({
          movies: currentMovieList,
          message: `${movie.title} was successfully added to the Movie Library`,
        });
        
      })
      .catch((error) => {
        console.log(error.messages);
    
        this.setState({
          message: error.message
        });
      });
  }

  render() {
    const { selectedMovie, selectedCustomer, message } = this.state

    return (
      <Router>
        <section className="App">
          <header>
            <h1>Last Resort Video Store</h1>
          </header>
      
          <nav className='nav-bar'>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search for Movie</Link>
              </li>
              <li>
                <Link to="/customers/">Customer List</Link>
              </li>
              <li>
                <Link to='/library/'>Movie Library</Link>
              </li>
            </ul>
          </nav>
 
          <section className='alert alert-dark'>
            {message}
          </section>

          <section className='currently-selected-items'>    
            {selectedMovie && 
              <div>
                <p>Selected Movie: {selectedMovie.title}</p>
                <button 
                  className='btn btn-warning' 
                  onClick={() => { this.setState({ selectedMovie: null}) }}>
                Remove Movie from Rental
                </button>
              </div>
            }
            {selectedCustomer &&
              <div>
                <p>Selected Customer: {selectedCustomer.name}</p>
                <button 
                  className='btn btn-warning' 
                  onClick={() => { this.setState({ selectedCustomer: null}) }}>
                Remove Customer from Rental
                </button>
              </div>
            }
            {selectedMovie && selectedCustomer && 
              <div>
                <button 
                  className='btn btn-success' 
                  onClick={this.onClickCheckout}>
                Checkout Rental
                </button>
              </div>
            }
          </section>
        
          <Route exact={true} path="/" render={() => (
            <img 
              className="vhs-tape" 
              src="https://i.ibb.co/47Qqpt4/7ml0qn-large.png" 
              alt="vhs tape with label that says all we have is now"
            />
          )} />
          <Route 
            path="/search" 
            render={(props) => <SearchMovie {...props} 
            movieList={this.state.movies} 
            addSearchToLibraryCallback={this.addSearchToLibrary}/> } 
          />
          <Route 
            path="/customers" 
            render={(props) => <CustomerList {...props} 
            customers={this.state.customers} 
            onSelectCustomerCallback={this.onSelectCustomer} /> } 
          />
          <Route 
            path="/library"
            render={(props) => <MovieList {...props} 
            movieList={this.state.movies} 
            onSelectMovieCallback={this.onSelectMovie} /> } 
          />
        </section>
      </Router>
    );
  }
};

export default App;
