import React from 'react'; 

const listErrors = (errors) => {
    
    const errorList=[];
    for (const field in errors) {
      for (const problem of errors[field]) {
        errorList.push(<li>{field}: {problem}</li>)
      }
    }
    return (
        <ul>
            {errorList}
        </ul>
    )
    
  };

export default listErrors;