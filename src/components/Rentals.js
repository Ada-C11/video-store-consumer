import React, {Component} from 'react';
import axios from 'axios';
// import Customer from './Customer'

const rentalURL = 'http://localhost:3000/rentals/'

class Rentals extends Component {
  constructor(props) {
    super(props);

    this.cleared = {
      checkoutDate: null,
      dueDate: null,
      searchName: '',
      customerID: null,
    }

    this.state = {
      ...this.cleared, 
      rentalLibrary: [],
    }
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
    const rentalDate = Date.now();
    
    // due in 3 days
    this.setState({checkoutDate: rentalDate, dueDate: rentalDate + 259200000})
    this.props.selectRentalCallback(movieTitle)
  }
 
  reserveRental = () => {
    const newRental = {
      customer_id: this.props.customerID,
      due_date: new Date(this.state.dueDate)
    }
    axios.post(rentalURL + this.props.movie + '/check-out', newRental)
   .then((response) => {
     console.log(response.status)
   })
   .catch((error) => {
     this.setState({errorMessage: error.message})
     console.log(error)
   })
   this.setState({...this.cleared});
   this.props.clearRentalCallback();
  }

  handleChange = (event) => {
    this.setState({searchName: event.target.value});
  }

  onSubmitCustomerName = (e) => {
    e.preventDefault()

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
    
    let makeReservation = true;
    if(this.props.customerID && this.props.movie) {
      makeReservation = false;
    }

   return (
     <section>
       <h1> Rewind Rentals </h1>
       <section>
         <h4> Current Customer ID: {this.props.customerID ? this.props.customerID : 'none'}</h4>
         <h4> Reserved movie: {this.props.movie ? this.props.movie : 'none selected'}</h4>
         <div hidden={makeReservation}>
            <button onClick={this.reserveRental}>Make Reservation</button>
         </div>
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