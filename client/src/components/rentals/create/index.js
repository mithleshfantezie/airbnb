import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {toUpperCase} from '../../../helper';
import FileUpload from '../../shared/form/fileUpload';
import * as actions from '../../../actions';
import { withRouter} from 'react-router-dom';

class CreateRental extends Component  {
  constructor() {
    super();

    this.state = {
      errors:[]
    }
    this.rentalCategories = ['apartment','room','house'];

  }

renderInputs(field) {
  const className = field.meta.touched && field.meta.error ? `form-group has-error` : `form-group `;
  return (
    <div className={className}>
    <label>{field.label}:</label>
    <input type={field.type} {...field.input}/>
    <div className="input-error">
    {field.meta.touched && field.meta.error ? field.meta.error : ''}
    </div>
    </div>
  )

}

renderTextArea(field) {
  const className = field.meta.touched && field.meta.error ? `form-group has-error` : `form-group `;

  return(
    <div className={className}>
    <label>{field.label}:</label>
    <textarea {...field.input}></textarea>
    <div className="input-error">
    {field.meta.touched && field.meta.error ? field.meta.error : ''}
    </div>
    </div>
  )
}

renderSelect(field) {
  const className = field.meta.touched && field.meta.error ? `form-group has-error` : `form-group `;

  return(
    <div className={className}>
    <label>{field.label}:</label>
    <select {...field.input}>
    {field.options.map((item,index)=>{
    return  <option key={index} value={item}>{toUpperCase(item)}</option>
    })}

    </select>
    </div>
  )
}

handleFormSubmit(values) {

  actions.CreateRental(values).then((rental)=>{

    this.props.history.push(`/rental/${rental._id}`);
  })
  .catch((errors)=>{
    this.setState({
      errors: errors.detail
    })
  })

}

  render() {

    return(
      <div className="container">
      <div className="container">
      <h1>Create Rental</h1>
      <div className="input-error">
      {this.state.errors}
      </div>
      <form onSubmit={this.props.handleSubmit((values)=>this.handleFormSubmit(values))}>

      <Field name="title" label="Title" type="text" component={this.renderInputs} />

      <Field name="city" label="City" type="text" component={this.renderInputs} />

      <Field name="street" label="Street" type="text" component={this.renderInputs} />

      <Field name="category" label="Category" options={this.rentalCategories} component={this.renderSelect} />

      <Field name="image" label="Image" type="file" component={FileUpload} />

      <Field name="bedrooms" label="Bed Rooms" type="number" component={this.renderInputs} />

      <Field name="shared" label="Shared" type="checkbox" component={this.renderInputs} />

      <Field name="description" label="Description" type="text" component={this.renderTextArea} />

      <Field name="dailyRate" label="Daily Rate" type="number" component={this.renderInputs} />

      <button className="button">Save Rental</button>
      </form>
      </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  if(parseInt(values.bedrooms) < 1 ) {
    errors.bedrooms = 'Value must be Greater than Zero(0)';

  }

  if(parseInt(values.dailyRate) < 1 ) {
    errors.dailyRate = 'Value must be Greater than Zero(0)';

  }

  if(!values.title) {
    errors.title = 'Title is required!';
  }

  if(!values.city) {
    errors.city = 'City is required!';
  }

  if(!values.street) {
    errors.street = 'Street is required!';
  }

  if(!values.bedrooms) {
    errors.bedrooms = 'Number of Bed Room(s) is required!';
  }

  if(!values.description) {
    errors.description = 'Description is required!';
  }

  if(!values.dailyRate) {
    errors.dailyRate = 'Amount of Daily Rate is required!';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'Rental_form',
  initialValues: {shared: false, category:'apartment', image: 'http://mithlesh.xyz/Psized.jpg'}
})(withRouter(CreateRental));
