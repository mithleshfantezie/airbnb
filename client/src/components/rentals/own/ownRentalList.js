import React from 'react';
import * as moment from 'moment';
import {toUpperCase} from '../../../helper';
import {Link} from 'react-router-dom';


const OwnRentalList = (props) => {
  const {rentals} = props;
    return rentals.data.map((item,index)=>{
      return(
        <div key={index} className="col-md-rental">
        <div className="title-part">
        <div className="title">{toUpperCase(item.title)} - {toUpperCase(item.city)}</div> <div className="close" onClick={()=>this.opendeleteRentalModal(item._id)}> &times; </div>
        </div>

        <div>
        <Link to={`/rental/${item._id}`}>Go To Rental</Link> <Link to={`/myrental/${item._id}/bookings`}>Bookings</Link>
        </div>
        <div className="timestamp">
          Created: {moment(item.createdAt).format('MMM Do Y')}
        </div>
        </div>
      )
    });

}

export default OwnRentalList;
