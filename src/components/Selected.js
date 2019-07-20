import React from 'react';
// import PropTypes from 'prop-types';
// import CustomerList from './CustomerList';
// import Library from './Library';
import './Selected.css';
import axios from 'axios';

function Selected(props) {
   const displaySelection = props.showMovie;
   const displayCustomer = props.showCustomer;
   const displayCustomerId = props.showCustomerId;


const handleSubmitRental = (customer, movie) => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate()+7);

  console.log(' due date is ', dueDate)
   const rentalDataToSendToApi ={
      "title": movie,
      "customer_id": customer,
      "due_date": dueDate
    }

   axios.post('http://localhost:3001/rentals/' + displaySelection + '/check-out', rentalDataToSendToApi)
   .then((response) => {
     console.log(response)
// ********* FIX THIS *******************************************
     // if (response.data) {
     //   // ***** CHECK ALL OF THIS AGAINST THE ACTUAL API RESPONSE!!! ****
     //   const successMessage =
     //   `Succesfully checked out movie ${response.data.movie_id} to cutomer ${response.data.customer_id}`
     //   this.setState({
     //       apiSuccess: successMessage
     //   })
  //    } else {
  //      const successMessage = response.data.errors
  //      this.setState({
  //          apiSuccess: successMessage
  //      })
  //    }
  //
  //    const resetSelected = () => {
  //      // WRITE A CALLBACK FUNCTION TO SET STATE IN APP
  //      // PASS IN THROUGH PROPS
  //      // displaySelection: '',
  //      // displayCustomer: ''
  //    }
  //
  // })
  // .catch((error) => {
  //   // console.log("in catch *******");
  //
  //     this.setState({
  //
  //         apiError: error.message
  //     })
  // });
    })

  }

  if (displaySelection !== '' || displayCustomer !== ''){
  return (

    <section>
      <div className="selected_objects_container" id="selected_objects_card">
          <h3>Customer: {displayCustomer}</h3>
          <h3>Current Movie: {displaySelection}</h3>
          <button className="most_btns" onClick={()=>handleSubmitRental(displayCustomerId, displaySelection)}>
            check out
          </button>
          </div>
    </section>
  );
} else {
    return null
}
}

export default Selected;
