
import React from 'react';

import {Route,Redirect} from 'react-router-dom';
import authService from '../../../services/auth-service';

const LoginRoute =(props) => {
const {component : Component, rest } = props;

return(
  <Route {...rest} render={(props)=> authService.isAuthinticated()
                                          ? <Redirect to={{pathname: '/rentals'}} />
                                          : <Component {...props} {...rest} />} />
)


};

export default LoginRoute;
