 import {
        FETCH_BOOKINGS_INIT,
        FETCH_BOOKINGS_SUCCESS,
        FETCH_BOOKINGS_FAIL,
        BOOKING_ON_OWN_RENTAL_INIT,
        BOOKING_ON_OWN_RENTAL_SUCCESS,
        BOOKING_ON_OWN_RENTAL_FAIL
 } from '../actions/type.js';


 const INITIAL_STATE = {
   bookings: {
     data: [],
     errors: []
   }
 }

 export const bookingsReducer = (state=INITIAL_STATE.bookings,action) => {

    switch (action.type) {
      case FETCH_BOOKINGS_INIT:
       return {...state,data: null,errors: null}

       case FETCH_BOOKINGS_SUCCESS:
       return {...state,data: action.bookings,errors:[]}

       case FETCH_BOOKINGS_FAIL:
       return {...state,errors: action.errors,data:[]}


      default:
        return state;
    }
 }

 export const bookingsOnOwnRentalReducer = (state=INITIAL_STATE.bookings,action) => {
   switch (action.type) {
     case BOOKING_ON_OWN_RENTAL_INIT:
      return {...state, data: null, errors: null}

    case BOOKING_ON_OWN_RENTAL_SUCCESS:
     return {...state, data: action.bookings}

    case BOOKING_ON_OWN_RENTAL_FAIL:
      return {...state, errors: action.errors}

     default:
      return state;

   }
 }
