import React from 'react';
import propTypes from 'prop-types';
import MoviePopup from './MoviePopup';

const Index = (props) => {
  console.log("inside index")
  return (
    <div>in index
      <div>{MoviePopup()}

      </div>
    </div>
  )
}
export default Index;
