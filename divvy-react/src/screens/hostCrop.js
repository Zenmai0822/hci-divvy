import React, { Component } from 'react';
import CanvasImgCropper from '../components/canvasImgCropper';

class HostCrop extends Component {
  

  render() {
    
    return <div> 
      <CanvasImgCropper viewWidth={this.props.viewWidth} viewHeight={this.props.viewHeight} file={this.props.location.state.file}/>
      
 </div>;
  }
}
export default HostCrop;