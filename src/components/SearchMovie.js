import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchMovie extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        searchTerm: '',
      };
    };
  
    onChangeHandler = (event) => {
    //   const field = {}
         const searchTerm = event.target.value
         this.setState({
             searchTerm
         });
    //   field[event.target.name] = event.target.value;
  
    //   this.setState(field);
    };
  
    handleSubmit = (event) => {
      event.preventDefault();

    //   const newCard = this.state;
  
    //   this.props.onFormSubmitCallback(newCard);
  
      this.setState({
        searchTerm: ''
      });
    };

    render() {
  
      return (
        <div className='search-movie-form'>
          <h3>Search by Movie Title:</h3>
  
          <form>
          {/* <form onSubmit={this.handleSubmit}> */}
        
                <input
                  className='movie-search-area'
                  name='text'
                  value={this.state.text}
                  placeholder='Ex: "Clueless"'
                  type='text'
                  onChange={this.onChangeHandler} 
                />
                
            <div>
              <input type="submit" value="Find Movie" />
            </div>
          </form>
        </div>
      );
    };
};



export default SearchMovie;