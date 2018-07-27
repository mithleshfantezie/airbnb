import React from 'react';
import {rentalType} from '../../../helper';

const RentalType = ({shared, category}) => {
return (
  <div className="detail">
  <span>{rentalType(shared)}</span>
  <span><i className="fa fa-star-of-life" />{category}</span>
  </div>
)
}

export default RentalType;
