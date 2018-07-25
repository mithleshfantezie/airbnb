import React,{ Component } from 'react';


import { connect } from 'react-redux';
import * as actions from '../../actions';



import RentalsList from './rentals-list';

class Rentals extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchRentals());
  }

  render() {
    return(
      <div className="container">
      <h2>Your Home All Around the World!</h2>
        <RentalsList rentals={this.props.rentals}/>
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
