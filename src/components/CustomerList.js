import React from 'react'
import axios from 'axios';
import Customer from './Customer'

class CustomerList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/customers')
    .then((response) => {
     this.setState({customers: response.data})
     console.log(this.state.customers)
    })
    .catch((error) => {
      this.setState({error: error.message})
    })
  }



  render() {
    const customerList = this.state.customers.map(cust => {
    
     return <Customer 
        name={cust.name}
        address={cust.address}
        city={cust.city}
        state={cust.state}
        postalCode={cust.postal_code}
        phone={cust.phone}
        moviesCheckedOutCount={cust.movies_checked_out_count}
        acountCredit={cust.account_credit}
        />
    })
    return (
      <article>
        {customerList}
      </article>
    );
  }
}
  
// account_credit: 13.15
// address: "Ap #292-5216 Ipsum Rd."
// city: "Hillsboro"
// id: 1
// movies_checked_out_count: 0
// name: "Shelley Rocha"
// phone: "(322) 510-8695"
// postal_code: "24309"
// registered_at: "2015-04-29T14:54:14.000Z"
// state: "OR"

export default CustomerList;