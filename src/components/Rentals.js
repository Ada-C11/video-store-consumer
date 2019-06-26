import React, {Component} from 'react';
import axios from 'axios';

class Rentals extends Component {
  constructor(props) {
    super(props);

    this.cleared = {
      movie: '',
      rentalLibrary: [],
      selectedMovie: '',
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
  addToRental = (movieTitle, e) => {
    e.preventDefault();
    console.log(movieTitle);
    this.setState({movie: movieTitle})
   
 }
 
 render() {
   const rentalCollection = this.state.rentalLibrary.map((movie, i) => {
     return(
      <tr key={i}>
        <td>{movie.id}</td>
        <td>{movie.title} </td>
        <td> {movie.release_date} </td>
        <td><button onClick={ (e) => this.addToRental(movie.title, e)}> Add to rental </button></td>
      </tr>
     )
   });
   return (
     <section>
       <h1> Rewind Rentals </h1>
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