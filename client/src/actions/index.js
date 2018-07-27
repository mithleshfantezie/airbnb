import axios from 'axios';

import { FETCH_RENTALS_INIT,
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_FAIL,
         FETCH_RENTAL_BY_ID_INIT,
         FETCH_RENTAL_BY_ID_SUCCESS,
         FETCH_RENTAL_BY_ID_FAIL} from './type.js';


const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}

const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }
}


const fetchRentalsError = (errors) => {
  return{

    type: FETCH_RENTALS_FAIL,
    errors
  }
}


export const fetchRentals = (city) => {
  const url = city  ? `/api/v1/rentals?city=${city}` : '/api/v1/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());

    axios.get(url)
         .then(res => res.data )
         .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
         .catch(({response}) => dispatch(fetchRentalsError(response.data.errors)));
  }

}

const fetchRentalByIdInit = () => {
  return{
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return{
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}

const fetchRentalByIdFail = (error) => {
  return {
    type: FETCH_RENTAL_BY_ID_FAIL,
    error
  }
}
export const fetchRentalById = (id) => {
  const url = `/api/v1/rentals/${id}`;

  return dispatch => {
    dispatch(fetchRentalByIdInit());

    axios.get(url)
         .then(res => res.data)
         .then(rental => dispatch(fetchRentalByIdSuccess(rental)))
         .catch(({response}) => dispatch(fetchRentalByIdFail(response.data.errors)));
  }
}
