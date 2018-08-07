import React, { Component } from 'react';


class FileUpload extends Component {

constructor() {
  super();

  this.onChange = this.onChange.bind(this);
}

  onChange(event) {
    console.log(event.target.files[0]);
    this.props.input.onChange('https://cdn5.vectorstock.com/i/1000x1000/51/74/hotel-building-line-outline-cartoon-style-vector-15275174.jpg');
  }

  render() {

    return(
    <div className="form-group">
    <label>{this.props.label}:</label>
    <input
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={(event)=>this.onChange(event)} />
    </div>
    )
  }
}


export default FileUpload;
