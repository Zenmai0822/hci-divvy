import React, { Component } from 'react';
import PerspectiveCrop from './perspectiveCrop';
import CanvasCropCorners from './canvasCropCorners';

class CanvasImgCropper extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	topLeft: null,
	  	topRight: null,
	  	botLeft: null,
	  	botRight: null,
	    blob: null
	  };
	  this.handleClick = this.handleClick.bind(this);
	  this.imageCallback = this.imageCallback.bind(this);
	  this.cropCallback = this.cropCallback.bind(this);

  }
  handleClick(e) {
	e.preventDefault();
	let point = {
								x: e.nativeEvent.layerX,
								y: e.nativeEvent.layerY,
							}
	if(this.state.topLeft == null) {
		this.setState({
			topLeft: point
		});
	}else if(this.state.topRight == null) {
		this.setState({
			topRight: point
		});

	}else if(this.state.botRight == null) {
		this.setState({
			botRight: point
		});
	}else {
		this.setState({
			botLeft: point
		});
	}
	console.log('The CANVAS was clicked at.');
	console.log(e.nativeEvent.layerX + " " + e.nativeEvent.layerY);
	}
	imageCallback(blob) {
		this.setState({
			blob: URL.createObjectURL(blob)
		});
	}
	cropCallback(blob) {
		this.setState({
			blob: URL.createObjectURL(blob)
		});
	}
  render() {
    if(this.state.topLeft == null || 
    	 this.state.topRight == null ||
    	 this.state.botLeft == null ||
    	 this.state.botRight == null ) {
    	return <CanvasCropCorners
    					handleClick={this.handleClick} 
			    		width={this.props.viewWidth}
						  height={this.props.viewHeight - 70}
						  imageCallback={this.cropCallback}
						  image={URL.createObjectURL(this.props.file)}
						  topLeft={this.state.topLeft}
						  topRight={this.state.topRight}
						  botLeft={this.state.botLeft}
						  botRight={this.state.botRight}
			    	 />;
    }
  	else{
  		let orignalHeight = Math.min(this.state.botRight.y - this.state.topRight.y,
  														 this.state.botLeft.y - this.state.topLeft.y);
  		let orignalWidth = Math.min(this.state.topRight.x - this.state.topLeft.x,
  														 this.state.botRight.x - this.state.botLeft.x);
  		let scaledHeight = (orignalHeight * this.props.viewWidth)/orignalWidth
  		return <PerspectiveCrop
						  handleClick={this.handleClick} 
						  image={this.state.blob}
						  width={this.props.viewWidth}
						  height={scaledHeight}
						  imageCallback={this.imageCallback}
						  anchors={{
						  	TL:this.state.topLeft,     
						 		TR:this.state.topRight,
						  	BR:this.state.botRight,
						  	BL:this.state.botLeft,
							}}
							unwarped={{
							  TL:{x:0,y:0},
							  TR:{x:this.props.viewWidth,y:0},
							  BR:{x:this.props.viewWidth,y:scaledHeight},
							  BL:{x:0,y:scaledHeight},
							}}
						/>;	
		}
  }
}
export default CanvasImgCropper;

 