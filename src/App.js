import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Search from './components/Search.js'
import Library from './components/Library'
import Customers from './components/Customers.js'
import Message from './components/Message.js'

function Index() {
  return <h2>Home</h2>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: '',
      selectedCustomer: ''
    }
  }

  reportStatus = (text) => {
    this.setState({message: text})
  }

  onMovieSelect = (title) => {
    const selectedMovie = title;
    this.setState({selectedMovie})
  }

  onCustomerSelect = (name, id) => {
    const selectedCustomer = {
      name: name,
      id: id,
      error: null
    }

    this.setState({selectedCustomer})
  }

  checkOut = () => {
  
    const currDate = new Date()
    currDate.setDate(currDate.getDate() + 3)
    const day = currDate.getDate()
    const month = currDate.getMonth() + 1
    const year = currDate.getFullYear()
    const dueDate = `${year}-${month}-${day}`

    const postURL = `http://localhost:3002/rentals/${this.state.selectedMovie}/check-out`

    axios.post(postURL, null, {
      params: {
        customer_id: this.state.selectedCustomer.id,
        due_date: dueDate
      }
})
    .then((response) => {
      this.setState({selectedCustomer: '', selectedMovie: ''})
      this.reportStatus("Check-out successful!");
    })
    .catch((error) => {
      this.setState({ error: error.message });
      this.reportStatus(`Uh-oh!  There was a problem: ${error.message}`)

    })
  }

  addMovie = (movie) => {
    // console.log(movie.image_url);
    //  const movie = props.movieData[event.target.id
        const postURL = 'http://localhost:3002/movies/add-movie'
        axios.post(postURL, null, {
            params: {
                external_id: movie.external_id,
                image_url: movie.image_url,
                overview: movie.overview,
                release_date: movie.release_date,
                title: movie.title
            }
        })
        .then((response) => {
            console.log(response)
            this.reportStatus("Movie successfully added to library!");

        })
        .catch((error) => {
            console.log(error.message)
            this.reportStatus(`Uh-oh!  There was a problem: ${error.message}`)
        })
  }

  myCustomersComponent = () => {
    return (
      <Customers
        selectCustomerCallback={this.onCustomerSelect.bind(this)} 
      />
    );
  }

  myLibraryComponent = () => {
    return (
      <Library
        selectMovieCallback={this.onMovieSelect.bind(this)} 
      />
    );
  }

  mySearchComponent = () => {
    return (
      <Search
        addMovieCallback={this.addMovie.bind(this)} 
        reportStatusCallback={this.reportStatus.bind(this)}
      />
    );
  }

  render() {

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search</Link>
              </li>
              <li>
                <Link to="/library/">Library</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
            </ul>
            <section>
              <div>
                {this.state.selectedMovie.length > 0 &&
                  <p>{this.state.selectedMovie}</p>
                }
              </div>
              <div>
                {this.state.selectedCustomer.name &&
                  <p>{this.state.selectedCustomer.name}</p>
                }
              </div>
              <div>
                {
                  this.state.selectedMovie.length > 0 &&
                  this.state.selectedCustomer.name &&
                  <button
                    onClick={this.checkOut}>Check Out</button>
                }
              </div>
            </section>
          </nav>

          <section>
            <Message message={this.state.message}/>
          </section>
  
          <Route path="/" exact component={Index} />
          <Route path="/search/" render={this.mySearchComponent} />
          <Route path="/library/" render={this.myLibraryComponent} />
          <Route path="/customers/" render={this.myCustomersComponent} />
        </div>
      </Router>
    );
  }
}

function AppRouter() {

}

export default App;