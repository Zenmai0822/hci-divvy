import React, { Component } from 'react';

class Crop extends Component {

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    canvas.width=this.props.width;
    canvas.height=this.props.height;
    ctx.drawImage(
      this.props.canvas,
      this.props.x,
      this.props.y,
      this.props.cropWidth,
      this.props.cropHeight,
      0,
      0,
      this.props.width,
      this.props.height
    );
    canvas.toBlob((blob) => {
      console.log(blob);
      this.props.imageCallback(blob);
    });
  }

  render() {
    return(
      <div className={this.props.displayNone ? 'd-none' : ''}>
        <canvas ref="canvas"
                width={this.props.width}
                height={this.props.height}
                onClick={this.props.handleClick}/>
      </div>
    )
  }
}
export default Crop;