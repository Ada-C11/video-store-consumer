import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerList from './components/CustomerList';
import RentalLibrary from './components/RentalLibrary';
import Search from './components/Search';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMovie: "",
      selectedCustomer: "",
      allRentals: [],
      // showMovies: false,
      // showCustomers: false
    }
  }

  // Index = () => {
  //   return <h2>Home</h2>;
  // }

  // About = () => {
  //   return <h2>About</h2>;
  // }

  // Users = () => {
  //   return <h2>Users</h2>;
  // }

  // showCustomerToggle = () => {
  //   const status = !this.state.showCustomers;
  //   this.setState({showCustomers: status,
  //                 showMovies: !status
  //   });
  // }

  // showMovieToggle = () => {
  //   const status = !this.state.showMovies;
  //   this.setState({showMovies: status,
  //                   showCustomers: !status});
  // }

  render() {
    return (
      <div>
        <Router>
          <div>
            <nav>
              <ul>
            {/* <Search /> */}
                <li>
                    <Link to="/movies" className="movies">Movies</Link>
                  </li>
                <li>
                  <Link to="/customers" className="customers">Customers</Link>
                </li>
                <li>
                  <Link to="/search" className="search">Search</Link>
                </li>
              {/* <button onClick={this.showMovieToggle}>Show Movies</button>
              <button onClick={this.showCustomerToggle}>Show Customers</button> */}
              </ul>
            </nav>
          </div>
          <main>
            <Route path="/movies" component={RentalLibrary} />
            <Route path="/customers" component={CustomerList} />
            <Route path="/search" component={Search} />
            {/* {this.state.showCustomers && <CustomerList />}
            {this.state.showMovies && <RentalLibrary />} */}
          </main>
        </Router>
      </div>
    );
  // return (
  //   <div>
  //     <Router >
  //       <div>
  //         <nav>
  //           <ul>
  //             <li>
  //               <Link to="/">Home</Link>
  //             </li>
  //             <li>
  //               <Link to="/movies/">All Movies</Link>
  //             </li>
  //             <li>
  //               <Link to="/customers/">Customers</Link>
  //             </li>
  //           </ul>
  //         </nav>

  //         {/* <Route path="/" exact component={Index} />
  //         <Route path="/about/" component={About} />
  //         <Route path="/users/" component={Users} /> */}
  //       </div>
  //     </Router>
  //   </div>
  // );
  // }
}
}

export default App;


