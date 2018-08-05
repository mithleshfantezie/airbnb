import React,{ Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../actions';

import RentalBooking from './rental-booking';
import RentalAssets from './rental-assets';
import InsideRental from './detail-inside-rental';
import RentalOwner from './rental-owner';
import RentalType from './rental-type';
import RentalImage from './rental-image';

class RentalSingle extends Component {

componentWillMount() {
  const id = this.props.match.params.id;
  this.props.dispatch(actions.fetchRentalById(id));

}

renderRental(rental) {

  if(rental.errors){
    if(rental.errors.length > 0){
      return(
        <div className="container">
        Sorry! You Encountered A Broken Link!
        </div>
      )
  }
  }

if(rental.data) {


  if(rental.data._id) {
  return(
  <div className="container">

  <RentalImage image={ `${rental.data.image}`} city={`${rental.data.city}`} street={`${rental.data.street}`} />


  <div className="row-single">
    <div className="col-md-10">
    <RentalType shared={`${rental.data.shared}`} category={`${rental.data.category}`}/>


      <RentalOwner title={`${rental.data.title}`} city={`${rental.data.city}`} username={`${rental.data.user.username}`}/>

      <InsideRental bedrooms={`${rental.data.bedrooms}`}/>

      <div className="description">{rental.data.description}</div>

      <RentalAssets/>
      </div>

    <RentalBooking rental={this.props.rental} isAuth={this.props.isAuth} />
  </div>
  </div>
)
}else{
  return(
    <div className="loading">
    <i className="fa fa-spin fa-spinner"/>
    </div>
  )
}
}

}

  render() {

    return(
      <div>
      {this.renderRental(this.props.rental)}
      </div>
    )
  }
}

function mapStateToProps(state){

  return{
    isAuth: state.auth.isAuth,
    rental: state.rental
  }
}


export default connect(mapStateToProps)(RentalSingle);
