import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

import {Redirect} from "react-router-dom";
import Button from 'react-bootstrap/Button';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    //this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
    //We dont do a great job of this in general.
  }

  render() {
  if(this.state.files.length > 0 )  {
    return <Redirect to={{
                      pathname: '/hostsetup/',
                      state: {
                        file: this.state.files[0]
                      }
                    }}
            />
  }  
  return (
    <div>
      <Dropzone 
        accept= 'image/*'
        onDrop={acceptedFiles => {
          this.setState({
              files: acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
              }))
          })}}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div className="divvy-upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <Button className="btn-upload" variant="success" size="lg" block>Upload a receipt</Button>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  )
  }
}
export default Upload;
