import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import MovieLibrary from './components/MovieLibrary'
import CustomerList from './components/CustomerList'

import './App.css';

import { Nav } from 'react-bootstrap'

//  Below code is modified from React Router Tutorial https://reacttraining.com/react-router/web/guides/quick-start


class AppRouter extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMovie: undefined,
      selectedCustomer:undefined,
    }
  }

  selectCustomer = (customer) => {
    console.log(customer);
    this.setState({
        selectedCustomer: customer,
    });
    
  }
  selectMovie = (movie) => {
    console.log(movie);
    this.setState({selectedMovie: movie});
  }

  render(){
    return (
      <Router>
        <div>
        <Nav variant="tabs" as="ul"> 
          <Nav.Item as="li">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
                
          </Nav.Item>
          <Nav.Item as="li" >
            <LinkContainer to="/search">
                <Nav.Link>Search</Nav.Link>  
            </LinkContainer>
          </Nav.Item>
          <Nav.Item as="li" eventKey="/library">
            <LinkContainer to="/library">
                  <Nav.Link>Library</Nav.Link>  
            </LinkContainer>
          </Nav.Item>
          <Nav.Item as="li">
            <LinkContainer to="/customers">
                  <Nav.Link>Customers</Nav.Link>  
            </LinkContainer>
          </Nav.Item>
        </Nav>
  
          <Route path="/" exact component={Index} />
          <Route path="/search/" exact component={Search} />
          
           />
          <Route
              path='/library'
              render={(props) => <MovieLibrary {...props} selectMovie={this.selectMovie} />}
          />
          <Route
              path='/customers'
              render={(props) => <CustomerList {...props} selectCustomer={this.selectCustomer} />}
          />
        </div>
      </Router>
    );
  }
  
}

export default AppRouter;