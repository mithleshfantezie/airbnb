import React from 'react';


const ResError = (props) => {
  const errors = props.errors;

return(
  errors.length > 0 &&
  <div className='errors'>
        {errors.map((error, index) => <p key={index}> {error.detail} </p>)}
      </div>

)


}


export default ResError;
