import React from 'react';
import {Route,Redirect } from 'react-router-dom';
import authService from '../../../services/auth-service';


const ProtectedRoutes = (props) => {

  const {component : Component, rest, computedMatch} = props;

  return(
    <Route params={computedMatch.params} {...rest} render={(props)=> authService.isAuthinticated()
                              ? <Component params={computedMatch} {...props} {...rest} />
                              : <Redirect to={{pathname: '/login'}} />} />
  )
}


export default ProtectedRoutes;
