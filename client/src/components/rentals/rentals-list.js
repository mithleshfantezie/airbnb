import React from 'react';
import {rentalType} from '../../helper';
import {Link} from 'react-router-dom';

const RentalsList = ({rentals}) => {
  const renderRentalsList = (rentals) => {
    if(rentals) {
      if(rentals.data.length > 0 ) {
        return rentals.data.map((item,index)=>{
          return(
            <Link  key={index} to={`/rental/${item._id}`} className="col-md-3">
            <div className="img" style={{ background: `url(${item.image})`}}>
            </div>
            <div className="detail">
            <span>{rentalType(item.shared)}</span>
            <span><i className="fa fa-tag" />{item.category}</span>
            <span><i className="fa fa-tag" />{item.city}</span>
            </div>

            <h3>{item.title}</h3>
            <div className="price-info">
            <span>${item.dailyRate} per Night</span>
            <span>#Free Cancelation</span>
            </div>
            </Link>
          )
        });
      }

    }
  }
  return(
    <div className="row">
    {renderRentalsList(rentals)}
    </div>
  )
}

export default RentalsList
;
