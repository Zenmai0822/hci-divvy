import React, { Component } from 'react';

const innerSideLen = 9;
const outerSideLen = 10;
const outerLineWidth = 4;
const innerLineWidth = 2;
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

      const scaledHeight = (this.state.img.height * this.props.width)/this.state.img.width;

      // set canvas sizes equal to image size 
      canvas.width=this.props.width;
      canvas.height=scaledHeight;
      
      // draw the example image on the source canvas
      // eslint-disable-next-line 
      this.state.ctx.drawImage(this.state.img, 0 , 0, this.props.width, scaledHeight);
      canvas.toBlob((blob) => {
        this.props.imageCallback(blob);
      });
    };
    // eslint-disable-next-line 
    this.state.img.src = this.props.image;
  }
  componentDidUpdate(prevProps) {
    //Redraw canvas
    if(this.props.points.length < prevProps.points.length) {
      const scaledHeight = (this.state.img.height * this.props.width) / this.state.img.width;
      this.state.ctx.clearRect(0, 0, this.props.width, scaledHeight);
      this.state.ctx.drawImage(this.state.img, 0, 0, this.props.width, scaledHeight);
    }
    //Redraw Points
    this.props.points.forEach((point) => {
      let x = point.x;
      let y = point.y;
      //Outer cross X
      // eslint-disable-next-line
      this.state.ctx.strokeStyle = 'white';
      // eslint-disable-next-line
      this.state.ctx.lineWidth = outerLineWidth;
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(x - outerSideLen, y);
      this.state.ctx.lineTo(x + outerSideLen, y);
      this.state.ctx.closePath();
      this.state.ctx.stroke();
      //Outer Cross Y
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(x, y - outerSideLen);
      this.state.ctx.lineTo(x, y + outerSideLen);
      this.state.ctx.closePath();
      this.state.ctx.stroke();
      //Inner cross X
      // eslint-disable-next-line
      this.state.ctx.strokeStyle = 'black';
      // eslint-disable-next-line
      this.state.ctx.lineWidth = innerLineWidth;
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(x - innerSideLen, y);
      this.state.ctx.lineTo(x + innerSideLen, y);
      this.state.ctx.closePath();
      this.state.ctx.stroke();
      //Inner Cross Y
      this.state.ctx.beginPath();
      this.state.ctx.moveTo(x, y - innerSideLen);
      this.state.ctx.lineTo(x, y + innerSideLen);
      this.state.ctx.closePath();
      this.state.ctx.stroke();
    });
  }

  render() {

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