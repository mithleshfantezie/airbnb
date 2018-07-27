import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {rentalReducer, selectedRentalReducer} from './rental-reducer';
import {reducer as formReducer} from 'redux-form';

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental : selectedRentalReducer,
    form: formReducer

  });

  const composeEnhancers = compose;

  const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), composeEnhancers(applyMiddleware(thunk)));


  return store;
}
