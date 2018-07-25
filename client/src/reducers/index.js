import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import rentalReducer from './rental-reducer';


export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer

  });

  const composeEnhancers = compose;

  const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), composeEnhancers(applyMiddleware(thunk)));


  return store;
}
