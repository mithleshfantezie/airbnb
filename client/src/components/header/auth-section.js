import React from 'react';
import {NavLink} from 'react-router-dom';


const UserAvail = () => {
  return(
    <div className="nav-links">
    <NavLink to="/login">Login</NavLink>
    <NavLink to="/signup">Signup</NavLink>
    </div>
  )
}

export default UserAvail;
