import React from 'react';

import RentalMap from './rentalgooglemap';

const RentalImage = (props) => {
  console.log(props);
  return(
    <div className="row">
    <div className="col-md-6">
    <div className="img" style={{background:`url(${props.image})`}} />
    </div>
    <div className="col-md-6">
    <RentalMap location={`${props.city},${props.street}`} />
    </div>
    </div>
  )
}

export default RentalImage;
