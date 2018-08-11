import axios from 'axios';
import AuthService from '../services/auth-service';
import axiosService from '../services/axios-service';

import { FETCH_RENTALS_INIT,
         FETCH_RENTALS_SUCCESS,
         FETCH_RENTALS_FAIL,
         FETCH_RENTAL_BY_ID_INIT,
         FETCH_RENTAL_BY_ID_SUCCESS,
         FETCH_RENTAL_BY_ID_FAIL,
         REGISTER_SUCCESS,
         REGISTER_FAIL,
         REGISTER_INIT,
         LOGIN_SUCCESS,
         LOGIN_FAIL,
         LOGIN_INIT,
         LOGOUT,
         FETCH_BOOKINGS_INIT,
         FETCH_BOOKINGS_SUCCESS,
         FETCH_BOOKINGS_FAIL,
         MANAGE_RENTAL_INIT,
         MANAGE_RENTAL_SUCCESS,
         MANAGE_RENTAL_FAIL,
         BOOKING_ON_OWN_RENTAL_INIT,
         BOOKING_ON_OWN_RENTAL_SUCCESS,
         BOOKING_ON_OWN_RENTAL_FAIL} from './type.js';


const axiosInstance = axiosService.getInstance();


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
         .catch((data) => {
           dispatch(fetchRentalsError(data.response.data.errors));

         });
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
         .catch((data) => dispatch(fetchRentalByIdFail(data.response.data.errors)));
  }
}

// user
const registerInit = () => {
  return{
    type:REGISTER_INIT
  }
}

const registerSuccess = (data) => {
  return{
    type: REGISTER_SUCCESS,
    data
  }
}

const registerFail = (errors) => {
  return{
    type: REGISTER_FAIL,
    errors
  }
}

export const clearSuccess = () => {
  return dispatch => {
    dispatch(registerInit());
  }
}

export const register = (value) => {

  return dispatch => {
     dispatch(registerInit());

    axios.post('/api/v1/user',value)
         .then(res => res.data)
         .then(success => dispatch(registerSuccess(success)))
         .catch(error => dispatch(registerFail(error.response.data.errors)));

  }

}

// Login

const loginInit = () => {
return {
  type: LOGIN_INIT
}
}

const loginSuccess = () => {
  const username = AuthService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFail = (errors) => {
  return {
    type: LOGIN_FAIL,
    errors
  }
}

export const clearLogin = () => {
  return dispatch => {
    dispatch(loginInit());
  }
}

export const loginUser = (userData) => {
  return dispatch => {
        dispatch(loginInit());
    axios.post('/api/v1/user/login',userData)
         .then(res => res.data)
         .then((token) => {
           AuthService.saveToken(token.token);
           dispatch(loginSuccess());
         })
         .catch(data => dispatch(loginFail(data.response.data.errors)));
  }
}

export const logout = () => {
  AuthService.invalidateUser();
  return {
    type: LOGOUT
  }
}

export const checkAuthState = () => {
return dispatch => {
  if(AuthService.isAuthinticated()){
    dispatch(loginSuccess());
  }

}
}


export const createBooking = (booking) => {
  return axiosInstance.post('/bookings',booking)
                      .then(res=>res.data)
                      .catch((data)=> Promise.reject(data.response.data.errors))
}

function fetchBookingsInit() {
  return{
    type: FETCH_BOOKINGS_INIT
  }
}

function fetchBookingsSuccess(bookings) {
  return{
    type: FETCH_BOOKINGS_SUCCESS,
    bookings
  }
}

function fetchBookingsFail(errors) {
  return {
    type: FETCH_BOOKINGS_FAIL,
    errors
  }
}

export const fetchBookings = () => {
  return dispatch => {
    dispatch(fetchBookingsInit());

    axiosInstance.get('/bookings/manage')
                 .then((res) => res.data)
                 .then((bookings) => dispatch(fetchBookingsSuccess(bookings)))
                 .catch((data) => dispatch(fetchBookingsFail(data.response.data.errors)))
  }
}

function manageRentalInit() {
  return{
    type: MANAGE_RENTAL_INIT
  }
}

function manageRentalSuccess(rentals) {
  return{
    type: MANAGE_RENTAL_SUCCESS,
    rentals
  }
}

function manageRentalfail(errors) {
  return{
    type: MANAGE_RENTAL_FAIL,
    errors
  }
}


export const manageRental = () => {
  return dispatch => {
    dispatch(manageRentalInit());

    axiosInstance.get('/rentals/manage')
                 .then(res => res.data)
                 .then(rental => dispatch(manageRentalSuccess(rental)))
                 .catch((data)=> dispatch(manageRentalfail(data.response.data.errors)))

  }
}

export const deleteRental = (id) => {
  return axiosInstance.delete(`/rentals/${id}`)
                      .then((res)=>res.data)
                      .catch((data)=>Promise.reject(data.response.data.errors))
}

export const CreateRental = (rental) => {
  return axiosInstance.post('/rentals',rental)
               .then(res => res.data)
               .catch(data => Promise.reject(data.response.data.errors))
}


function bookingsOnOwnRentalInit() {
  return{
    type: BOOKING_ON_OWN_RENTAL_INIT
  }
}

function bookingsOnOwnRentalSuccess(bookings) {
  return{
    type: BOOKING_ON_OWN_RENTAL_SUCCESS,
    bookings
  }
}

function bookingsOnOwnRentalFail(errors) {

  return{
    type: BOOKING_ON_OWN_RENTAL_FAIL,
    errors
  }
}


export const bookingsOnOwnRental = (id) => {
  return dispatch => {
    dispatch(bookingsOnOwnRentalInit());

    axiosInstance.get(`/bookings/rental/${id}`)
                 .then((res)=> res.data)
                 .then((bookings)=>dispatch(bookingsOnOwnRentalSuccess(bookings)))
                 .catch((data)=>dispatch(bookingsOnOwnRentalFail(data.response.data.errors)))

  }
}
