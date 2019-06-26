import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Search from './components/Search.js'
import Library from './components/Library'
import Customers from './components/Customers.js'

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

  onMovieSelect = (title) => {
    const selectedMovie = title;
    this.setState({selectedMovie})
  }

  onCustomerSelect = (name, id) => {
    const selectedCustomer = {
      name: name,
      id: id
    }

    this.setState({selectedCustomer})
  }

//   axios.post(postURL, {
//     params: {
//       customer: this.state.selectedCustomer.id,
//       due_date: dueDate
//     }
// })

  checkOut = () => {
    // const postURL = `http://localhost:3002/rentals/${this.state.selectedMovie}/check-out`
    // const postURL = "http://localhost:3002/rentals/Psycho/check-out?customer_id=3&due_date=2019-6-28"
    // console.log(postURL);
    const currDate = new Date()
    currDate.setDate(currDate.getDate() + 3)
    const day = currDate.getDate()
    const month = currDate.getMonth() + 1
    const year = currDate.getFullYear()
    const dueDate = `${year}-${month}-${day}`

    console.log(dueDate);
    const postURL = `http://localhost:3002/rentals/${this.state.selectedMovie}/check-out`

    axios.post(postURL, null, {
      params: {
        customer_id: this.state.selectedCustomer.id,
        due_date: dueDate
      }
})
    .then((response) => {
      console.log(response)
      // this.setSate
    })
    .catch((error) => {
      console.log(error)
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
  
          <Route path="/" exact component={Index} />
          <Route path="/search/" component={Search} />
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