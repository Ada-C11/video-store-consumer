import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'

import MovieLibrary from './components/MovieLibrary'
import CustomerList from './components/CustomerList'
import Search from './components/Search'
import Selected from './components/Selected'

import './App.css';
import Notification from "./components/Notification"

import { Nav } from 'react-bootstrap'

//  Below code is modified from React Router Tutorial https://reacttraining.com/react-router/web/guides/quick-start

const Index = () => {
  return (
    <div className='home-page'>
      <h1>Erica and Shubha's Video Store</h1>
      <img src="https://static1.squarespace.com/static/5048f125e4b0bd178ab3741a/t/557c49cfe4b00283cf1ed72f/1434208719772/" alt="empty movie theater"/>
    </div>
  
    );
}


class AppRouter extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedMovie: undefined,
      selectedCustomer:undefined,
      notifications: [],
      activeRentals:0
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

  addNotification = (notificationProps) => {
    const {toastTitle, toastMessage, toastTimestamp, error} = notificationProps;
    const notification = (< Notification
      id={this.state.notifications.length + 1}
      key={this.state.notifications.length + 1}
      toastTitle= {toastTitle}
      toastMessage= {toastMessage}
      toastTimestamp= {toastTimestamp}
      error= {error}
      dismissNotification={this.dismissNotification}
      />);
    
    this.setState({
      notifications:[...this.state.notifications, notification],
      notificationCount: this.state.notificationCount + 1
    })
  }

  dismissNotification = (notificationID) => {
    const updatedNotifications = this.state.notifications.filter((obj)=>{
      return obj.props.id !== notificationID;
    });

    this.setState({
      notifications: updatedNotifications
    });
  }

  clearSelection= () => {
    this.setState( {
      selectedMovie: undefined,
      selectedCustomer:undefined,
      activeRentals: this.state.activeRentals + 1,
    });
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
          clearSelectionCallback ={this.clearSelection}
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
              activeRentals = {this.state.activeRentals}
              addNotificationCallback={this.addNotification}/>}
          />

          <Route
              path='/customers'
              render={(props) => <CustomerList {...props}
              selectCustomer={this.selectCustomer} 
              activeRentals = {this.state.activeRentals}
              addNotificationCallback={this.addNotification}/>}
              
          />
        </div>
      </Router>
    );
  }
  
}

export default AppRouter;