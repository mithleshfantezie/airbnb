import React, { Component } from 'react';
import {Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';

import {connect} from 'react-redux';

import * as actions from '../../actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Signup extends Component {

  constructor() {
    super();

    this.state = {
      redirect: false
    }

}


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
  handleForm(value) {
    this.props.dispatch(actions.register(value));

  }

  notify(detail) {
    return toast.error(detail);
  }

  render() {
    if(this.props.register){
      if(this.props.register.errors.length > 0) {
        const errors =  this.props.register.errors[0].detail;
          this.props.dispatch(actions.clearSuccess());
          this.notify(errors);

      }else if (this.props.register.success.Success) {
        this.props.dispatch(actions.clearSuccess());
        this.setState({redirect:true});
      }
    }

    console.log(this.props);
     const {redirect } = this.state;

    if(redirect) {
      return <Redirect to={{pathname:'/login', state:{successRegister:true}}} />
    }
    return(
      <div className="container">




        <h2><i className="fa fa-users" /> Register Here!</h2>
        <form onSubmit={this.props.handleSubmit((e)=>this.handleForm(e))}>

        <Field name="username" type="text" label="Name" component={this.renderInputs} />

        <Field name="email" type="email" label="Email" component={this.renderInputs} />

        <Field name="password" type="password" label="Password" component={this.renderInputs} />

        <Field name="confirmPassword" type="password" label="Confirm Password" component={this.renderInputs} />

        <button className="button">Register</button>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

function validate(value) {

const errors = {};
const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(value.password && value.confirmPassword) {
  if(value.password !== value.confirmPassword){
  errors.confirmPassword = 'Password you have provided didnot matched!';
  }
}

if(String(value.password).length < 6) {
  errors.password = 'Password should be greater than 6 Characters!';
}

if(value.email){
  const e = value.email.toLowerCase();
  if(!regex.test(e)){
    errors.email = 'Please provide a valid email!';
  }
}

if(!value.username) {
  errors.username = 'Please provide a username!';
}
if(!value.email) {
  errors.email = 'Please provide a email!';
}
if(!value.password) {
  errors.password = 'Please provide a password!';
}
if(!value.confirmPassword) {
  errors.confirmPassword = 'Please provide same password as above!';
}

  return errors;
}


function mapStateToProps(state) {
  return{
    register: state.register
  }

}
export default reduxForm({
  validate,
  form:'Register_form'
})(connect(mapStateToProps)(Signup));
