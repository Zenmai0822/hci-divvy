import React, { Component } from 'react';

class Crop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: new Image()
    };

  }
  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    canvas.width=this.props.width;
    canvas.height=this.props.height;
    if(this.props.canvas !== undefined) {
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
      // return blob
      canvas.toBlob((blob) => {
        this.props.imageCallback(blob, canvas.toDataURL());
      });
    } else {
      // eslint-disable-next-line
      this.state.img.onload = function(){
        // draw the image on the source canvas
        ctx.drawImage(
          this.state.img,
          this.props.x,
          this.props.y,
          this.props.cropWidth,
          this.props.cropHeight,
          0,
          0,
          this.props.width,
          this.props.height
        );
        // return blob
        canvas.toBlob((blob) => {
          this.props.imageCallback(blob, canvas.toDataURL());
        });
      }.bind(this);
      // eslint-disable-next-line
      this.state.img.src = this.props.image;
    }
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