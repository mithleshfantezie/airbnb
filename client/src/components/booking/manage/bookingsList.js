import React from 'react';
import * as moment from 'moment';
import {toUpperCase} from '../../../helper';
import {Link} from 'react-router-dom';


const BookingsList = (props) => {

    if(props.bookings) {
      if(props.bookings.data.length > 0 ) {

        return props.bookings.data.reverse().map((item,index)=> {

          return(
            <div key={`${index}`}>
            {
              (item.rentals)
              ? <div className="col-md-new">
                <div className="rental-type">{toUpperCase(item.rentals.category)}</div>
                <div className="title">{item.rentals.title} - {toUpperCase(item.rentals.city)}</div>
                <div className="description">{toUpperCase(item.rentals.description)}</div>
                <div className="time-interval">{moment(item.startAt).format('L')+ ` to ` + moment(item.endAt).format('L') +` | ${item.days} days` }</div>
                <div> Price: <span className="booking-price"> ${item.totalPrice}</span></div>
                <Link to={`/rental/${item.rentals._id}`} className="rental-btn">Go To Rental</Link>
                <div className="timestamp">Created {moment(item.createAt).format('MMM Do Y')}</div>
                </div>
              : <div className="col-md-new">
                <div className="rental-type">Deleted Rental</div>
                <div className="title">Owner has deleted the Rental</div>
                <div className="description">No Longer Available!</div>
                <div className="time-interval">{moment(item.startAt).format('L')+ ` to ` + moment(item.endAt).format('L') +` | ${item.days} days` }</div>
                <div> Price: <span className="booking-price"> ${item.totalPrice}</span></div>
                <div className="timestamp">Created {moment(item.createAt).format('MMM Do Y')}</div>
                </div>
            }
            </div>

          )
        })

      }else if (props.bookings.length === 0) {
        return(
        <div>No Bookings has Been Made Yet!</div>
      )
      }else {
        return(
          <div className="loading"><i className="fa fa-spin fa-spinner"/></div>
        )
      }

    }

};

export default BookingsList;
