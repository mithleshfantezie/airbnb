import React from 'react';
import {Link} from 'react-router-dom';
import BookRental from '../../booking/booking';
const RentalBooking = (props) => {
  const { isAuth } = props;
  const {dailyRate} = props.rental.data;
  const bookingLen = props.rental.data.bookings.length;



const renderLogin = () => {
  return(
    <div className="auth">
    <div className="login">
      <Link to="/login"><button>Login and Book this Place Today!</button></Link>
      </div>
      </div>


  )
}

  return(

    <div className="col-md-2">
    <div className="rental-rate"><span>${dailyRate}</span><sub>per night</sub></div>


    {isAuth ? <BookRental rental={props.rental.data}/> :  renderLogin() }


    <div className="review">Peoples are Interested in this house!</div>
    <div className="review">{(bookingLen > 1 ) ? `More than ${bookingLen} peoples have checked in here!` : `${bookingLen} people have checked in here!`} </div>

    </div>
  )
}


export default RentalBooking;
