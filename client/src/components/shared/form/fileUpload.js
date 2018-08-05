import React, { Component } from 'react';


class FileUpload extends Component {

constructor() {
  super();

  this.onChange = this.onChange.bind(this);
}

  onChange(event) {
    console.log(event.target.files[0]);
    this.props.input.onChange('http://mithlesh.xyz/Psized.jpg');
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
