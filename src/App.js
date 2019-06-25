import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import MovieLibrary from './components/MovieLibrary'
import CustomerList from './components/CustomerList'
import Search from './components/Search'

import './App.css';

import { Nav } from 'react-bootstrap'

//  Below code is modified from React Router Tutorial https://reacttraining.com/react-router/web/guides/quick-start

function Index() {
  return <h2>Home</h2>;
}

function AppRouter() {
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
        <Route path="/search/" component={Search} />
        <Route path="/library/" component={MovieLibrary} />
        <Route path="/customers/" component={CustomerList} />
      </div>
    </Router>
  );
}

export default AppRouter;