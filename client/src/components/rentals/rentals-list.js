import React from 'react';
import {rentalType} from '../../helper';
import {Link} from 'react-router-dom';

const RentalsList = ({rentals}) => {
  const renderRentalsList = (rentals) => {
    if(rentals) {
      if(rentals.data.length > 0 ) {
        return rentals.data.map((item)=>{
          return(
            <Link to={`/rental/${item._id}`} key={item._id} className="col-md-3">
            <div className="img" style={{ background: `url(${item.image})`}}>
            </div>
            <div className="detail">
            <span>{rentalType(item.shared)}</span>
            <span>{item.category}</span>
            <span>{item.city}</span>
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

    }else{
      return(
        <div><h1>Loading...</h1></div>
      )
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
