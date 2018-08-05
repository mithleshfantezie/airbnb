import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../actions';
import BookingsList from './bookingsList';


class ManageBookings extends Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchBookings());
  }



  renderBookings(bookings) {

if(bookings) {
  if(bookings.data){
    if(bookings.data.length > 0 && bookings.data[0]._id) {
      return (
        <div className="container">
        <div className="container">
        <h1>My Bookings</h1>
        <div className="row">
        <BookingsList  bookings={this.props.bookings} />
        </div>
        </div>
        </div>
      )
    }else if (bookings.data.length === 0) {
      return (
        <div className="loading">
          <i className="fa fa-edit" />
          <div>No Bookings has been Made Yet!</div>
        </div>

      )
    }
  }else if (!bookings.data) {
    return(
      <div className="loading">
        <i className="fa fa-spin fa-spinner" />
      </div>
    )
  }

    }
  }

render() {

    return(
      <div className="container">

      {this.renderBookings(this.props.bookings)}


      </div>
    )
  }
}

function mapStateToProps(state) {

  return{
    bookings: {
      data: state.bookings.data,
      errors:state.bookings.error
   }
  }
}

export default connect(mapStateToProps)(ManageBookings);
