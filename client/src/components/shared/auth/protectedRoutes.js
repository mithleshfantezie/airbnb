import React from 'react';
import {Route,Redirect } from 'react-router-dom';
import authService from '../../../services/auth-service';


const ProtectedRoutes = (props) => {
  const {component : Component, rest } = props;
  return(
    <Route {...rest} render={(props)=> authService.isAuthinticated()
                              ? <Component {...props} {...rest} />
                              : <Redirect to={{pathname: '/login'}} />} />
  )
}


export default ProtectedRoutes;
