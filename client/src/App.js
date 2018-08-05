import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';


import Header from './components/header/main';
import Rentals from './components/rentals/main';
import SearchRentals from './components/rentals/search-rentals';
import RentalSingle from './components/rentals/rentalsingle';
import Login from './components/login';
import Signup from './components/signup';
import ManageBookings from './components/booking/manage/index';
import ManageRentals from './components/rentals/own';
import CreateRental from './components/rentals/create';
import UsersBooking from './components/booking/own-rental';

import * as actions from './actions';

class App extends Component {

  componentWillMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    this.props.dispatch(actions.checkAuthState());
  }

  render() {

    return (
      <BrowserRouter>
      <div>
      <Header auth={this.props.auth}/>
      <Switch>
      <Route exact path="/" component={()=> <Redirect to="/rentals" />} />
      <Route exact path="/rentals" component={Rentals} />
      <Route exact path="/city/:city/homes" component={SearchRentals} />
      <Route exact path="/rental/:id" component={RentalSingle} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/manage/bookings" component={ManageBookings} />
      <Route exact path="/manage/rentals" component={ManageRentals} />
      <Route exact path="/create/rental" component={CreateRental}/>
      <Route exact path="/myrental/:id/bookings" component={UsersBooking} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {

  return{
    auth: state.auth
  }
}


export default connect(mapStateToProps)(App);
