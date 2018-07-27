import React from 'react';

const InsideRental = ({bedrooms}) => {
  return(
    <div className="rental-inside-detail">
    <span><i className="fa fa-building" /> {bedrooms} bedrooms</span>
    <span><i className="fa fa-user" /> {bedrooms * 2} guests</span>
    <span><i className="fa fa-bed" /> {bedrooms * 2} beds</span>
    </div>
  )
}

export default InsideRental;
