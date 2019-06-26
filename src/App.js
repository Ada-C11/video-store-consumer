import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieTitle: "",
      customer: "",
      error: "",
      errorClass: "no-error",
    }

  }

  onCheckoutClick = () => {
    console.log('https://localhost:3090/rentals/' + this.state.movieTitle + '/check-out')
    console.log(this.state.movieTitle)
    console.log(this.state.customer.id)
    console.log(new Date() + 7)
    let today = new Date()
    let newdate = new Date();
    newdate.setDate(today.getDate()+7);
    axios.post('http://localhost:3090/rentals/' + this.state.movieTitle + '/check-out', 
    
      {
        title: this.state.movieTitle,
        customer_id: this.state.customer.id,
        due_date: newdate
      }
    )

    .then((response) => {
      console.log(response)
    })

    .catch((error)=>{
      console.log(error.message)
      this.setState({error: error.message, errorClass: 'display-error'});
      console.log(this.state.error)
      console.log(this.state.errorClass)

    })
    // this.setState({error: "", errorClass: 'no-error'});
  }


  addMovieToRent = (title) => {
    let movieTitle = this.state.movieTitle;
    movieTitle = title;
    this.setState({movieTitle})
    console.log("in callback ", title)
  }

  addCustomerToRent = (customer) => {
    let newCustomer = this.state.customer;
    newCustomer = customer;
    this.setState({customer: newCustomer})
    
  }

  onClickAnywhere = () => {
    this.setState({error: "", errorClass: 'no-error'});
  }

  render () {    
    return (
      <Router>
        <div onClick = {this.onClickAnywhere}>
          <p className={this.state.errorClass} >{this.state.error}</p>
          <h2>{this.state.movieTitle}</h2>
          <h2>{this.state.customer.name}</h2>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/library" render={(routeProps) => (<Library {...routeProps} addMovieToRentCallback={this.addMovieToRent}/>)}
          />
          <Route path="/customers" render={(routeProps) => (<Customers {...routeProps} addCustomerToRentCallback={this.addCustomerToRent}/>)} 
          />
          <button
            onClick={this.onCheckoutClick}>
          Checkout!</button>
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

class Search extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      searchList: []
    }
  }

  onChangeTitle = (event) => {
    let title = this.state.title;
    // const field = event.target.name;
    const value = event.target.value;
    title = value;
    this.setState({title})

  }

  onFormSubmit = (event) => {
    event.preventDefault();
    axios.get('http://localhost:3090/movies?query=' + this.state.title.toString())
    .then((response) => {
      console.log(response.data)
      const searchList = response.data.map((movie) => {
          return movie
      })
      this.setState({searchList})
    })
    
  }


  onMovieSelect = (movie) => {
    return () => {
    axios.post('http://localhost:3090/movies', 
    {
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      image_url: movie.image_url,
      external_id: movie.external_id,
    }
    )
    .then((response) => {
      console.log(response)
    })
      let newState = this.state
      newState.searchList = [];
      this.setState({newState});
    }
  }

  searchDisplay = () => {
    return this.state.searchList.map((movie) => {
        return (
          <div>
            <p>{movie.title}</p>
            <p onClick={this.onMovieSelect(movie)}>Select!</p>
          </div>
        )
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
        <h4>{this.searchDisplay()}</h4>
      </div>
    );
  }
}

function Movie (props) {
  const onTitleClick = () => {
    props.addMovieToRentCallback(props.title)
  }

  return <p onClick={onTitleClick}>{props.title}</p>
}

class Library extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      movieList: [],
    };
  }

    generateMovieList = () => {
      console.log(this.props)
      return this.state.movieList.map((movie) => {
        return (<Movie 
        key={movie.id}
        id={movie.id}
        title={movie.title}
        addMovieToRentCallback = {this.props.addMovieToRentCallback}
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
  const onCustomerClick = () => {
    props.addCustomertoRentCallback(props.customer)
  }
  return <p onClick={onCustomerClick}>{props.customer.name}</p>
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
        customer={customer}
        addCustomertoRentCallback = {this.props.addCustomerToRentCallback}
      />)
    })
  }

  componentDidMount() { 
    axios.get("http://localhost:3090/customers") 
    .then((response)=>{
    const customerList = response.data.map((customer) => {
      return customer
    })
    console.log(customerList)
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
