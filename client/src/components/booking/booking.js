import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';

import 'bootstrap-daterangepicker/daterangepicker.css';

import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

import { getRangeOfDates } from '../../helper';
import * as moment from 'moment';

import BookingModal from './bookingModal';
import {connect} from 'react-redux';

import * as actions from '../../actions';
class BookRental extends Component {
  constructor(props) {
    super(props);

    this.bookedOutDates = [];
    this.dateRef = React.createRef();

    this.state = {
      purposedBooking : {
        startAt: '',
        endAt: '',
        guests: ''
      },
      modal: {
        open: false
      },
      errors: []
    }

    this.handleApply = this.handleApply.bind(this);
    this.checkInvalidDates = this.checkInvalidDates.bind(this);
    this.getBookedOutDates = this.getBookedOutDates.bind(this);
    this.selectGuests =  this.selectGuests.bind(this);
    this.confirmProposedDate = this.confirmProposedDate.bind(this);
    this.cancelConfirmation = this.cancelConfirmation.bind(this);
    this.reserveRental = this.reserveRental.bind(this);

  }

componentWillMount() {
  this.getBookedOutDates();
}


notify(detail){
  return toast.success(detail);
}


notifyError(detail){
  return toast.error(detail);
}

handleApply(event, picker) {
  const startAt = picker.startDate.format('Y/MM/DD');
  const endAt = picker.endDate.format('Y/MM/DD');

  this.dateRef.current.value = startAt + ' to ' + endAt;



  this.setState({
    purposedBooking : {
      ...this.state.purposedBooking,
      startAt: startAt,
      endAt: endAt
    }
  });

}


getBookedOutDates() {
 const bookings = this.props.rental.bookings;

  if(bookings && bookings.length > 0){
    bookings.map((booking)=>{
      const dateRange = getRangeOfDates(booking.startAt,booking.endAt,'Y/MM/DD');
      this.bookedOutDates.push(...dateRange);
    });
  }
}

checkInvalidDates(date) {
  return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(),'days') < 0;

}

selectGuests(event) {

  this.setState({
    purposedBooking: {
      ...this.state.purposedBooking,
      guests: parseInt(event.target.value,10)
    }
  })
}


addNewBookingDates(booking) {
  const dateRange = getRangeOfDates(booking.startAt,booking.endAt);

  this.bookedOutDates.push(...dateRange);
}

resetData() {

  this.dateRef.current.value = '';
  this.setState({
    purposedBooking: {guests:''}
  });
}

confirmProposedDate() {
  if(parseInt(this.state.purposedBooking.guests) < 0 && parseInt(this.state.purposedBooking.guests) !== 0 ){
    return this.notifyError("Please Enter value Greater than zero!")
  }
  const {startAt,endAt} = this.state.purposedBooking;
  const days = getRangeOfDates(startAt,endAt).length;


  const {rental} = this.props;

  this.setState({
    purposedBooking: {
      ...this.state.purposedBooking,
      days,
      totalPrice: days * rental.dailyRate,
      rental: rental._id
    }
  });
  this.setState({modal:{open:true}});


}

cancelConfirmation() {
  this.setState({modal:{open:false}})
}

reserveRental() {


  actions.createBooking(this.state.purposedBooking).then((booking)=>{
    this.notify('Successfully created Booking!');
    this.addNewBookingDates(booking);
    this.cancelConfirmation();
    this.resetData();





  },(errors)=>{
    this.setState({errors});
  })

}

  render() {

    const {startAt, endAt, guests} = this.state.purposedBooking;
    const {open} = this.state.modal;


    return(
      <div className="booking">

      <label>Dates:</label>
      <DateRangePicker
            onApply={this.handleApply}
            isInvalidDate={this.checkInvalidDates}
            opens='left'
            containerStyles={{display: 'block'}}>
          <input ref={this.dateRef} type="text" id="dates" className="input-group"  />
      </DateRangePicker>

      <label>Guest(s):</label>
      <input

              type="number"
              value={this.state.purposedBooking.guests}
              onChange={(event)=>this.selectGuests(event)}
              className="input-group"  />
      <button disabled={!startAt || !endAt || !guests } onClick={()=>this.confirmProposedDate()} className="btn">Reserve Place Now</button>

      <BookingModal open={open}
                    closeModal={this.cancelConfirmation}
                    confirmModal={this.reserveRental}
                    booking={this.state.purposedBooking}
                    errors={this.state.errors}
                    rentalPrice={this.props.rental.dailyRate} />
      <ToastContainer />
      </div>
    )
  }
}


export default connect(null)(BookRental);
