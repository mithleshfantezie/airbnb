import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';

import Search from './search-box';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class Header extends Component {


handleLogout() {
  this.props.dispatch(actions.logout())
  this.props.history.push('/rentals');
}

renderLinks() {

const { isAuth } = this.props.auth;
if(isAuth){
  return(
    <div className="nav-links">
    <div>{this.props.auth.username}</div>
    <div className="drop-down"><button>Owners Section<i className="fa fa-down-arrow" /></button>
    <div className="dropdown-content">
        <NavLink to="/create/rental">Create Rental</NavLink>
        <NavLink to="/manage/rentals">Manage Rental</NavLink>
        <NavLink to="/manage/bookings">Manage Bookings</NavLink>
        </div>
        </div>
    <div onClick={()=>this.handleLogout()}>Logout</div>
    </div>
  )
}else {
  return(
  <div className="nav-links">
  <NavLink to="/login">Login</NavLink>
  <NavLink to="/signup">Signup</NavLink>
  </div>
    )
}
}

  render(){
  return (
    <header>
    <div className="logo-section">
    <div  className="logo">
    <h2><NavLink to="/">BookAT!</NavLink></h2>
    </div>
    <div className="Search-box">
    <Search/>
    </div>
    </div>
    <div className="auth-section">

    {this.renderLinks()}


    </div>
    </header>
  )
}
}

export default withRouter(connect(null)(Header));
