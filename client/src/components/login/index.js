import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

class Login extends Component {

renderInputs(field) {

  return(
    <div>
    <label>{field.label}:</label>
    <br/>
    <input type={field.type} {...field.input} />
    {field.meta.touched && field.meta.error ? <div className="input-error"> {field.meta.error} </div> : ''}
     </div>

  )

}

handleFormSubmit(e) {

console.log(e);
}

  render() {

    return(
    <div className="container">
      <div className="">
      <h2>Get into Your Account!</h2>
      <form onSubmit={this.props.handleSubmit((e)=>this.handleFormSubmit(e))}>
      <Field name="email" type="email" label="Email" component={this.renderInputs} />

      <Field name="password" type="password" label="Password" component={this.renderInputs} />

      <button >Login</button>
      </form>
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

export default reduxForm({
validate,
form: 'login-form'
})(connect(null)(Login));
