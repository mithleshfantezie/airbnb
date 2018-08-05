import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {rentalReducer, selectedRentalReducer, manageRentalReducer} from './rental-reducer';
import {registration} from './registration-reducer';
import {authReducer} from './auth-reducer';
import {reducer as formReducer} from 'redux-form';
import {bookingsReducer, bookingsOnOwnRentalReducer} from './bookings-reducer';
export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental : selectedRentalReducer,
    myRentals: manageRentalReducer,
    form: formReducer,
    register: registration,
    auth: authReducer,
    bookings: bookingsReducer,
    UserBookings : bookingsOnOwnRentalReducer
  });

  const composeEnhancers = compose;

  const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), composeEnhancers(applyMiddleware(thunk)));


  return store;
}
