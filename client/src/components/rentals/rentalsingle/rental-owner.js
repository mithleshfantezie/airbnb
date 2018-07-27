import React from 'react';
import {toUpperCase} from '../../../helper';

const RentalOwner = ({username,title,city}) => {
  return (
    <div className="room-info">
    <div>
    <div className="title">{toUpperCase(title)}</div>
    <div className="city">{toUpperCase(city)}</div>
    </div>


    <div className="rental-owner">
    <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
    <div className="username">{toUpperCase(username)}</div>
    </div>
    </div>
  )
}

export default RentalOwner;
