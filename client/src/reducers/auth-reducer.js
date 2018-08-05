import { LOGIN_SUCCESS,
         LOGIN_FAIL,
         LOGIN_INIT,
         LOGOUT } from '../actions/type.js';

const INITIAL_STATE = {
  isAuth: false,
  errors: [],
  username: ''
}

export const authReducer = (state = INITIAL_STATE,action) => {
  switch (action.type) {
    case LOGIN_INIT:
    return {...state,isAuth:false,errors:[],username: ''}
    case LOGIN_SUCCESS:
      return {...state,isAuth: true,errors: [],username: action.username}

    case LOGIN_FAIL:
     return {...state,errors:action.errors}

     case LOGOUT:
     return {...state,isAuth: false, username: ''}

    default:
    return state;

  }
}
