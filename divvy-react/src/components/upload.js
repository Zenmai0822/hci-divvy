import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import { Helmet } from 'react-helmet';
import PerspectiveCrop from './perspectiveCrop';
import {Redirect} from "react-router-dom";

class Upload extends React.Component {
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
  if(this.state.files.length > 0 )	{
  	console.log(this.state.files[0]);
  	return <Redirect to={{
  										pathname: '/crop/',
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
			      <div {...getRootProps()}>
			        <input {...getInputProps()} />
			        <p>Click to select files</p>
			      </div>
			    </section>
	    	)}
			</Dropzone>
		</div>
  )
	}
}
export default Upload;