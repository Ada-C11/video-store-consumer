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

class Search extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    }
  }

  onChangeTitle = (event) => {
    let title = this.state.title;
    // const field = event.target.name;
    const value = event.target.value;
    title = value;
    this.setState({title})

  }

  onFormSubmit = () => {
    axios.get('http://localhost:3090/movies/' + this.state.title.toString())
    .then((response) => {
      console.log(response)

    })
  }
  render () {
    return (
      <div>
        <h2>Search</h2>
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" value={this.state.title} onChange={this.onChangeTitle}/>
          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

function Movie (props) {
  return <p>{props.title}</p>
}

class Library extends Component {
  constructor() {
    super()
  
    this.state = {
      movieList: [],
    };
  }

    generateMovieList = () => {
      return this.state.movieList.map((movie) => {
        return (<Movie 
        key={movie.id}
        title={movie.title}
        />)
      })
    }

    componentDidMount() { 
      axios.get("http://localhost:3090/movies") 
      .then((response)=>{
        const movieList = response.data.map((movie) => {
          return movie
        })
      this.setState({movieList})
    })
  
  }


render () {
  return (
  <div>
  <h2>Library</h2>
  <h2>{this.generateMovieList()}</h2>
  </div>
  );
  }
}

function Customer (props) {
  return <p>{props.name}</p>
}

class Customers extends Component {
  constructor() {
    super();
    
    this.state = {
      customerList: [],
    };
  }

  generateCustomerList = () => {
    return this.state.customerList.map((customer) => {
      return (<Customer 
        key={customer.id}
        name={customer.name}
      />)
    })
  }

  componentDidMount() { 
    axios.get("http://localhost:3090/customers") 
    .then((response)=>{
    const customerList = response.data.map((customer) => {
      return customer
    })
    this.setState({customerList})

  })

}
 
  render () {
    return (
    <div>
      <h2>{this.generateCustomerList()}</h2>
    </div>
  );
}
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
