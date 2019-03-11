import React, { Component } from 'react';

const sideLen = 15;
class CanvasCropCorners extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    img: new Image(),
	    ctx: null
	  };

  }
  
  componentDidMount() {
    const canvas = this.refs.canvas;
    this.setState({
    	ctx: canvas.getContext("2d")
    });
    // eslint-disable-next-line 
    this.state.img.onload = () => {

			let scaledHeight = (this.state.img.height * this.props.width)/this.state.img.width

      // set canvas sizes equal to image size	
	  	canvas.width=this.props.width;
		  canvas.height=scaledHeight;
		  
		  // draw the example image on the source canvas
		  // eslint-disable-next-line 
		  this.state.ctx.drawImage(this.state.img, 0 , 0, this.props.width, scaledHeight);
		  // eslint-disable-next-line 
		  this.state.ctx.fillStyle = 'white';
	   	canvas.toBlob((blob) => {
		    this.props.imageCallback(blob);
			});
		}
		// eslint-disable-next-line 
    this.state.img.src = this.props.image;
  }

  render() {
  	if(this.props.topLeft != null) {
		  	let x = this.props.topLeft.x;
		  	let y = this.props.topLeft.y;
		  	this.state.ctx.beginPath();
		    this.state.ctx.moveTo(x, y);
		    this.state.ctx.lineTo(x+sideLen, y);
		    this.state.ctx.lineTo(x, y+sideLen);
		    this.state.ctx.closePath();
    		this.state.ctx.stroke();
    		this.state.ctx.fill();
		  }

		  if(this.props.topRight != null) {
		  	let x = this.props.topRight.x;
		  	let y = this.props.topRight.y;
		  	this.state.ctx.beginPath();
		    this.state.ctx.moveTo(x, y);
		    this.state.ctx.lineTo(x-sideLen, y);
		    this.state.ctx.lineTo(x, y+sideLen);
		    this.state.ctx.closePath();
    		this.state.ctx.stroke();
    		this.state.ctx.fill();
		  }

		  if(this.props.botLeft != null) {
		  	let x = this.props.botLeft.x;
		  	let y = this.props.botLeft.y;
		  	this.state.ctx.beginPath();
		    this.state.ctx.moveTo(x, y);
		    this.state.ctx.lineTo(x+sideLen, y);
		    this.state.ctx.lineTo(x, y-sideLen);
		    this.state.ctx.closePath();
    		this.state.ctx.stroke();
    		this.state.ctx.fill();
		  }

		  if(this.props.botRight != null) {
		  	let x = this.props.botRight.x;
		  	let y = this.props.botRight.y;
		  	this.state.ctx.beginPath();
		    this.state.ctx.moveTo(x, y);
		    this.state.ctx.lineTo(x-sideLen, y);
		    this.state.ctx.lineTo(x, y-sideLen);
		    this.state.ctx.closePath();
    		this.state.ctx.stroke();
    		this.state.ctx.fill();
		  }
    return(
      <div>
        <canvas ref="canvas" 
			width={this.props.width} 
			height={this.props.height}
			onClick={this.props.handleClick} />
      </div>
    )
  }
}

export default CanvasCropCorners;