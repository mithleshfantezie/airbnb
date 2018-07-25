import { FETCH_RENTALS_INIT,
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_FAIL } from '../actions/type.js';


const INITIAL_STATE = {
  rentals: {
    data: [],
    errors: []
  },
  retnal: {
    data: {}
  }
}


export default function(state=INITIAL_STATE.rentals,action) {
  switch (action.type) {
    case FETCH_RENTALS_INIT:
      return {...state,data:[] ,errors:[] };
    case FETCH_RENTALS_SUCCESS:
      return {...state, data: action.rentals};

    case FETCH_RENTALS_FAIL:
    return Object.assign({}, state, {errors:action.errors,data:[]});



    default:
      return state;

  }
}
