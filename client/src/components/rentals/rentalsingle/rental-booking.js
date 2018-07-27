import React from 'react';

const RentalBooking = ({dailyRate, bookings}) => {

  return(

    <div className="col-md-2">
    <div className="rental-rate"><span>${dailyRate}</span><sub>per night</sub></div>

    <div className="auth">
    <div className="login">
    <button>Login and Book this Place Today!</button>
    </div>
    </div>

    <div className="review">Peoples are Interested in this house!</div>
    <div className="review">{(bookings > 1 ) ? `More than ${bookings} peoples have checked in here!` : `${bookings} people have checked in here!`} </div>

    </div>
  )
}


export default RentalBooking;
