import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Redirect } from 'react-router-dom';


class Login extends Component {


renderInputs(field) {
const className = field.meta.touched && field.meta.error ? 'form-group has-error' : 'form-group';
  return(
    <div className={`${className}`}>
    <label>{field.label}:</label>
    <input type={field.type} {...field.input} />
    {field.meta.touched && field.meta.error ? <div className="input-error"> {field.meta.error} </div> : ''}
     </div>

  )

}

notify(detail) {
    return toast.error(detail);
  }

handleFormSubmit(e) {
this.props.dispatch(actions.loginUser(e));
}

  render() {
    if(this.props.auth){
      if(this.props.auth.errors.length > 0) {
          this.notify(this.props.auth.errors[0].detail);
          this.props.dispatch(actions.clearLogin());

      }
    }
    const {isAuth} =this.props.auth;
    const {successRegister} = this.props.location.state || false;
    if (isAuth) {
      return <Redirect to={{pathname: '/rentals'}} />
    }
    return(
    <div className="container">
      <div className="">
      <h2>Get into Your Account!</h2>
      { successRegister ?
      <div className="register-success">
      <p>You have been Successfully Registered. Now you can Login!</p>
      </div>
      : ''
      }
      <form onSubmit={this.props.handleSubmit((e)=>this.handleFormSubmit(e))}>
      <Field name="email" type="email" label="Email" component={this.renderInputs} />

      <Field name="password" type="password" label="Password" component={this.renderInputs} />

      <button className="button">Login</button>
      </form>
        <ToastContainer />
      </div>
    </div>
  )
  }
}

function validate(value) {

  const errors = {};
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(value.email){
    const e = value.email.toLowerCase();
    if(!regex.test(e)){
      errors.email = 'Please Enter a valid email.'
    }
  }

  if(!value.email) {
    errors.email = 'Please provide the email.'
  }

  if(!value.password) {
    errors.password = 'Please enter your password.'
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
validate,
form: 'login-form'
})(connect(mapStateToProps)(Login));
