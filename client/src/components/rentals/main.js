import React,{ Component } from 'react';


import { connect } from 'react-redux';
import * as actions from '../../actions';



import RentalsList from './rentals-list';

class Rentals extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  renderRental(rentals) {
    if(rentals.data.length === 0 ) {
      return(
        <div className="loading">
        <i className="fa fa-spin fa-spinner" />
        </div>
      )
    }
    if(rentals.data){
      if(rentals.data.length > 0) {
        return(
          <div>
          <h2>Your Home All Around the World!</h2>
          <RentalsList rentals={this.props.rentals}/>
          </div>
        )
      }else if (rentals.data.length === 0 ) {
        <div className="loading">
        <i className="fa fa-building"/>
        <div>No Rental Available to Show!</div>
        </div>
      }
    }
  }

  render() {

    return(
      <div className="container">
        {this.renderRental(this.props.rentals)}
      </div>
    )
  }

}

function mapStateToProps(state) {
  return{
    rentals: state.rentals
  }
}


export default connect(mapStateToProps)(Rentals);
