import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Search from './components/Search';
import MovieLibrary from './components/MovieLibrary';
import Customer from './components/Customer';
import Checkout from './components/Checkout';
import SearchResult from './components/SearchResult';

const URL = 'http://localhost:4000/movies'

class App extends Component {

  constructor(){
    super();
    this.state = {
      searchResults: [],
    }
  }

  onSearchButtonCallback = (searchInput) => {

    axios.get(URL, {params: {query: searchInput}})
    .then((response) => {
      console.log(response.data);
 
     

      

      this.displaySearchResults(response.data)

    })
    .catch((error) => {
      console.log(error)  
    })
  
    
  }

  displaySearchResults = (result) => {
    console.log(result)
    this.setState({
        searchResults: result,
      });
  }

  render() {
 
    return (
      <div className="App">
        <header className="App-header">
        <Router>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/search'>Search</Link>
                </li>
                <li>
                  <Link to='/movielibrary'>Movie Library</Link>
                </li>
                <li>
                  <Link to='/customers'>Customer List</Link>
                </li>
                <li>
                  <Link to='/checkout'>Checkout</Link>
                </li>
              </ul>
            </nav>
            <Route path="/search" render={(props) => <Search onSearchButtonCallback={this.onSearchButtonCallback}/>} />
            <Route path="/movielibrary" component={MovieLibrary} />
            {/* <Route path="/customers" component={Customer} /> */}
            {/* <Route path="/checkout" component={Checkout} /> */}

          </Router>
        </header>
        <section>
          <SearchResult result={this.state.searchResults}/>
        </section>
        
      </div>
    );
  }
}

export default App;
