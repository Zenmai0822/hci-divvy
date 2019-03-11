import React, { Component } from 'react';
import CanvasImgCropper from '../components/canvasImgCropper';

class HostCrop extends Component {
   constructor(props) {
    super(props);
    this.state = {
      blob: null
    };
    this.imageCallback = this.imageCallback.bind(this);
  }
imageCallback(blob) {
    this.setState({
      blob: URL.createObjectURL(blob)
    });

  }

  render() {
    if(this.state.blob == null) {
      return <div> 
        <CanvasImgCropper 
          viewWidth={this.props.viewWidth -30} 
          viewHeight={this.props.viewHeight} 
          file={this.props.location.state.file}
          imageCallback={this.imageCallback}
        />
        
      </div>;
    } else {
      return <div>Stub for item cropping step 
      <img src={this.state.blob} /></div>
    }

  }
}
export default HostCrop;