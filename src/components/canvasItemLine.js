import React, { Component } from 'react';

class CanvasItemLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: new Image(),
      ctx: null,
      start: null,
      end: null
    };
  this.touchStart = this.touchStart.bind(this);
  this.touchMove = this.touchMove.bind(this);
  this.touchEnd = this.touchEnd.bind(this);
  }
  
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx =  canvas.getContext("2d");
    this.setState({
      ctx: ctx
    });

     // set canvas sizes equal to image size
     canvas.width=this.props.width;
     canvas.height=this.props.height;

     // eslint-disable-next-line
    this.state.img.onload = () => {
      // draw the example image on the source canvas
      // eslint-disable-next-line
      ctx.drawImage(this.state.img, 0 , 0);
    };
    // eslint-disable-next-line
    this.state.img.src = this.props.image;
  }
  componentDidUpdate(prevProps) {
    //Redraw canvas
    if (this.props.image !== prevProps.image) {
      const image = new Image();
      image.src = this.props.image;
      image.onload = function() {
        // draw the example image on the source canvas
        // eslint-disable-next-line
        this.state.ctx.clearRect(0, 0, this.props.width, this.props.height);
        this.state.ctx.drawImage(image, 0 , 0);
        this.setState({img: image});
      }.bind(this);
      // eslint-disable-next-line

    }
  }
  touchMove(e){
    let point = {
                  x: e.changedTouches[0].pageX - e.changedTouches[0].target.offsetLeft,
                  y: e.changedTouches[0].pageY - e.changedTouches[0].target.offsetTop
                };
    this.setState({
      end: point
    })
  }

  touchStart(e)  {
    let point = {
                  x: e.changedTouches[0].pageX - e.changedTouches[0].target.offsetLeft,
                  y: e.changedTouches[0].pageY - e.changedTouches[0].target.offsetTop
                };
    this.setState({
      start: point
    })
  }

  touchEnd() {
    this.props.touchEnd(this.state.start, this.state.end);
  }

  render() {
    if(this.state.start != null && this.state.end != null) {
        this.state.ctx.clearRect(0, 0, this.props.width, this.props.height);
        this.state.ctx.drawImage(this.state.img, 0 , 0);
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(this.state.start.x, this.state.start.y);
        this.state.ctx.lineTo(this.state.end.x, this.state.end.y);
        this.state.ctx.closePath();
        this.state.ctx.stroke();
        this.state.ctx.fill();
      }
    return(
      <div>
        <canvas ref="canvas" 
          width={this.props.width} 
          height={this.props.height}
          onTouchStart={this.touchStart}
          onTouchEnd={this.touchEnd}
          onTouchMove={this.touchMove}
       />
      </div>
    )
  }
}

export default CanvasItemLine;