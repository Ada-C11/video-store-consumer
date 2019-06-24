import {React, Component} from 'react'

class VideoStore extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      movieCollection: [], 
      currentCustomer: null,
    }
  }

  //TODO: the api call will happen here

  render () {
    return (
      <div>
        Video Store
      </div>
    )
  }
  
}