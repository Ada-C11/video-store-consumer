import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/library" component={Library} />
        <Route path="/customers" component={Customers} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Search() {
  return <h2>Search</h2>;
}

function Library() {
  return <h2>Library</h2>;
}

// function Topic({ match }) {
//   return <h3>Requested Param: {match.params.id}</h3>;
// }

function Customer () {
  return <p>props.customer.name</p>
}

function Customers() {

  const generateCustomerList = () => {
    const result = axios.get("http://localhost:3090/customers") 
    .then((response)=>{
    const customerList = response.data.map((customer) => {
      return customer
    })
    console.log(customerList)
    return customerList
    // return customerList.map((customer) => {
    //   return <Customer customer={customer}/>
    // })
  })
  console.log(result)
  return <p>{result}</p>

  }
  return (
    <div>
      <h2>Hi check this</h2>
      <h2>{generateCustomerList()}</h2>
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/library">Library</Link>
      </li>

      <li>
        <Link to="/customers">Customers</Link>
      </li>
    </ul>
  );
}

export default App;
