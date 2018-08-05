import React,{ Component } from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';


import DeleteRentalModal from './deleteRentalModal';

import OwnRentalList from './ownRentalList';

class ManageRentals extends  Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      errors: [],
      modal: {
        open:false
      }
    }

  }



  componentWillMount() {
    this.props.dispatch(actions.manageRental());
  }

  notify(detail){
    return toast.success(detail);
  }

  opendeleteRentalModal(id) {

    this.setState({
      id: id,
      modal:{open:true}
    })
  }

  renderRentals(rentals) {
    if(rentals.data) {
      if(rentals.data.length > 0 && rentals.data[0]._id) {
        return(

          <div className="container">
          <h1>My Rentals</h1>
          <div className="container">
          <div className="container">
          <div className="row">

          <OwnRentalList rentals={rentals} />

          </div>
          </div>
          </div>
          </div>
        )


      }else if (rentals.data.length === 0) {
        return (
          <div className="loading">
            <i className="fa fa-building" />
            <div>You have no Rental Created!</div>
          </div>
        )

      }
    }else if (!rentals.data) {
      return(
        <div className="loading">
          <i className="fa fa-spin fa-spinner" />
        </div>
      )
    }


  }


  closeModal() {
    this.clearError();
    this.setState({
      modal:{open:false}
    })
  }

  clearError() {
    this.setState({
      errors: []
    })
  }


deleteRental(id)  {
  actions.deleteRental(id).then((success)=>{
    this.notify('Rental has been Deleted!');
    this.props.dispatch(actions.manageRental());
    this.clearError();
    this.closeModal();
  },(errors)=>{

    this.setState({errors});
  });
}




render() {
  return(
    <div className="container">
    {this.renderRentals(this.props.myRentals)}

    <DeleteRentalModal open={this.state.modal.open} closeModal={()=>this.closeModal()}  errors={this.state.errors} confirmModal={()=>this.deleteRental(this.state.id)}  />
    <ToastContainer />
      </div>

  )
}
}

function mapStateToProps(state){

  return{
    myRentals: {
      data:state.myRentals.data,
      errors:state.myRentals.error
    }
  }
}

export default connect(mapStateToProps)(ManageRentals);
