import React, {Component} from 'react';
import axios from 'axios';

const rentalURL = 'http://localhost:3000/rentals/'
class Rentals extends Component {
  constructor(props) {
    super(props);

    this.cleared = {
      movie: '',
      checkoutDate: '',
      dueDate: '',
      rentalLibrary: [],
      
    }

    this.state = this.cleared
  }
 
 
  componentDidMount() {
    axios.get('http://localhost:3000/movies')
    .then((response) => {
      this.setState({rentalLibrary: response.data})
      console.log(this.state.rentalLibrary)
    })
    .catch((error) => {
      this.setState({errorMessage: error.message})
      console.log(error.message)
    })
  } 

  // TO DO: confirm this works
  onButtonClick = (movieTitle, e) => {
    e.preventDefault();
    console.log(movieTitle);
    const rentalDate = Date.now();
    this.setState({movie: movieTitle, checkoutDate: rentalDate, dueDate: rentalDate + 2})
  }
 
  reserveRental () {
    axios.post(`${rentalURL}${this.state.movie}/checkout`)
   .then((response) => {
     this.setState({rentalLibrary: response.data})
     console.log(this.state.rentalLibrary)
   })
   .catch((error) => {
     this.setState({errorMessage: error.message})
     console.log(error.message)
   })
  }

  findCustomer(params) {

  }

 render() {
   const rentalCollection = this.state.rentalLibrary.map((movie, i) => {
     return(
      <tr key={i}>
        <td>{movie.id}</td>
        <td>{movie.title} </td>
        <td> {movie.release_date} </td>
        <td><button onClick={ (e) => this.onButtonClick(movie.title, e)}> Add to rental </button></td>
      </tr>
     )
   });
   return (
     <section>
       <h1> Rewind Rentals </h1>
       <section>
         <h4> Current Customer ID: {this.props.customerID ? this.props.customerID : 'none'}</h4>
         <form>
          <label>
            Find Customer:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
         <h4> Reserved movie: {this.state.movie ? this.state.movie : 'none selected'}</h4>
       </section>
       <table className="table table-striped table-hover table-sm"> 
       <thead>
         <tr>
          <th scope="col">Rental ID</th>
          <th scope="col">Title</th>
          <th scope="col">Release Date</th>
          <th scope="col"> Reserve </th>
        </tr>
      </thead>
         <tbody>
          {rentalCollection}
        </tbody>
       </table>
     </section>
   )
 }
}


export default Rentals