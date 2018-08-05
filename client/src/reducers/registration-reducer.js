import {REGISTER_SUCCESS,
        REGISTER_FAIL,
        REGISTER_INIT} from '../actions/type.js';

const INITIAL_STATE = {
  register: {
    success: [],
    errors: []
  }
}

export const registration = (state=INITIAL_STATE.register,action) => {
  switch (action.type) {
    case REGISTER_INIT:
    return {...state,success:[],errors:[]}
    case REGISTER_SUCCESS:
    return {...state,success:action.data,errors:[]}

    case REGISTER_FAIL:
    return {...state,success:[],errors:action.errors}

    default:
    return state;

  }
}
