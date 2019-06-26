import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import MovieLibrary from './components/MovieLibrary'
import CustomerList from './components/CustomerList'
import Search from './components/Search'
import Selected from './components/Selected'

import './App.css';

import { Nav } from 'react-bootstrap'

//  Below code is modified from React Router Tutorial https://reacttraining.com/react-router/web/guides/quick-start

const Index = () => {
  return (<p>home</p>);
}


class AppRouter extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMovie: undefined,
      selectedCustomer:undefined,
      notifications: []
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

  addNotification = (notification) => {
    console.log(notification);
    this.setState({
      notifications:[...this.state.notifications, notification]
    })
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
          <Nav.Item as="li">
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

        <div className='App-notification-list'>
              {this.state.notifications}
        </div>
        

        <Selected 
          movie={this.state.selectedMovie}
          customer={this.state.selectedCustomer}
          addNotificationCallback={this.addNotification}
          />

          <Route path="/" exact component={Index} />
          <Route path="/home" exact component={Index} />
          
          <Route path="/search/" render={(props) => <Search {...props}
          addNotificationCallback={this.addNotification}
          />} 
          />
          
          
          <Route
              path='/library'
              render={(props) => <MovieLibrary {...props}selectMovie={this.selectMovie} 
              addNotificationCallback={this.addNotification}/>}
              
          />

          <Route
              path='/customers'
              render={(props) => <CustomerList {...props}selectCustomer={this.selectCustomer} 
              addNotificationCallback={this.addNotification}/>}
              
          />
        </div>
      </Router>
    );
  }
  
}

export default AppRouter;