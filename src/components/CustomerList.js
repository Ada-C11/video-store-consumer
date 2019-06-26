import React from 'react'
import axios from 'axios';
import Customer from './Customer'
import './CustomerList.css'

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
    })
    .catch((error) => {
      this.setState({error: error.message})
    })
  }

  render() {
    console.log(this.props)
    const customerList = this.state.customers.map((cust, i) => {
     return <Customer 
        key={i}
        id={cust.id}
        name={cust.name}
        address={cust.address}
        city={cust.city}
        state={cust.state}
        postalCode={cust.postal_code}
        phone={cust.phone}
        moviesCheckedOutCount={cust.movies_checked_out_count}
        accountCredit={cust.account_credit}
        selectCustCallback={this.props.selectCustCallback}
        />
    })
    return (
      <article>
        <h1>Customer Registry</h1>
        <div className="customer-list">
        {customerList}
        </div>
      </article>
    );
  }
}

export default CustomerList;