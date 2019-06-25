import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

  onMovieSelect = (props) => {
    this.setState({selectedMovie: props.title})
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
            </section>
          </nav>
  
          <Route path="/" exact component={Index} />
          <Route path="/search/" component={Search} />
          <Route path="/library/" component={Library} />
          <Route path="/customers/" component={Customers} />
        </div>
      </Router>
    );
  }
}

function AppRouter() {

}

export default App;