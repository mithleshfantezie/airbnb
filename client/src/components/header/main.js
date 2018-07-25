import React from 'react';
import {NavLink} from 'react-router-dom';

import Search from './search-box';
import UserAvail from './auth-section';

const Header = () => {
  return (
    <header>
    <div className="logo-section">
    <div  className="logo">
    <h2><NavLink to="/">Book Here!</NavLink></h2>
    </div>
    <div className="Search-box">
    <Search/>
    </div>
    </div>
    <div className="auth-section">
    <UserAvail/>
    </div>
    </header>
  )
}

export default Header;
