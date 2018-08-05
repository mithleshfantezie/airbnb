import React, { Component } from 'react';
import {toUpperCase,checkExpired } from '../../../helper';
import * as moment from 'moment';

import {connect} from 'react-redux';
import * as actions from '../../../actions';

class UsersBooking extends Component {

componentWillMount() {
  const rentalId = this.props.match.params.id;
  this.props.dispatch(actions.bookingsOnOwnRental(rentalId));
}


renderBookings(bookings) {


  if(bookings.data) {
    if(bookings.data && bookings.data.length > 0 ) {
      return bookings.data.map((item,index)=>{
        return(
        <div key={index} className="col-md-new">
        <div className="rental-type">{checkExpired(item.startAt)}</div>
        <div className="title">Booker: {toUpperCase(item.user.username)}</div>
        <div className="description">Email: {toUpperCase(item.user.email)}</div>
          <div className="time-interval">{moment(item.startAt).format('L')} to {moment(item.endAt).format('L')} | {item.days} days </div>
          <div> Price: <span className="booking-price">${item.totalPrice}</span></div>

          <div className="timestamp">Created {moment(item.createAt).format('L')}</div>
          </div>
        )
      })
    }
  }else if (!bookings.data) {
    return(
      <div className="loading">
      <i className="fa fa-spin fa-spinner" />
      </div>
    )
  }

}
  render() {
    if(this.props.bookings.errors) {

        return(
          <div className="loading">
            <i className="fa fa-edit" />
            <div>{this.props.bookings.errors.detail}</div>
          </div>
        )

    }



    return(
      <div className="container">
      <h2>Bookings on Your Rental</h2>
      <div className="row">
      {this.renderBookings(this.props.bookings)}

      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    bookings: {
      data: state.UserBookings.data,
      errors: state.UserBookings.errors
    }
  }
}

export default connect(mapStateToProps)(UsersBooking);
