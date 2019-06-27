import React, {Component} from 'react';
import axios from 'axios';
// import Customer from './Customer'


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
      console.log(response.data)
    })
    .catch((error) => {
      this.setState({errorMessage: error.message})
      console.log(error.message)
    })
  } 

  // TO DO: confirm this works
  onButtonClick = (movieTitle, e) => {
    e.preventDefault();
    this.props.selectRentalCallback(movieTitle);
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