import React, { Component, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone'
import { Helmet } from 'react-helmet';
import PerspectiveCrop from './perspectiveCrop';
import {Redirect} from "react-router-dom";
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

class Upload extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    files: []
	  };
	}

 	componentDidMount() {
    // Make sure to revoke the data uris to avoid memory leaks
    //this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
	}

	componentDidUpdate() {
    // Make sure to revoke the data uris to avoid memory leaks
    //this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
	}

	render() {
	  function  handleClick(e) {
    	e.preventDefault();
    	console.log('The CANVAS was clicked at.');
    	console.log(e.nativeEvent.layerX + " " + e.nativeEvent.layerY);
  }
  if(this.state.files.length > 0 )	{
  	return <Redirect 
  						to={{
  							pathname: '/crop/',
  							state: {
    							file: this.state.files[0]
  							}
  						}}
					/>
  }  
	  const thumbs = this.state.files.map(file => (
	    <div key={file.name}>
	      <div>	       
  			<PerspectiveCrop
  			  handleClick={handleClick}
  			  image={URL.createObjectURL(file)}
  			  width={500}
  			  height={500}
  			  anchors={{
				  	TL:{x:10,y:20},     
				 		TR:{x:620,y:80},
				  	BR:{x:610,y:310},
				  	BL:{x:0,y:255},
					}}
					unwarped={{
					  TL:{x:0,y:0},
					  TR:{x:300,y:0},
					  BR:{x:300,y:300},
					  BL:{x:0,y:300},
					}}
			/>	

	      </div>
	    </div>
	  ))

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
				      <aside>
				        {thumbs}
				      </aside>
				    </section>
		    	)}
				</Dropzone>
			</div>
	  )
	}
}
export default Upload;