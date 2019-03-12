import React, { Component } from 'react';
import CanvasImgCropper from '../components/canvasImgCropper';
import ItemCropper from '../components/itemCropper';
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
      blob: blob
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
      return <ItemCropper
          viewWidth={this.props.viewWidth -30} 
          viewHeight={this.props.viewHeight} 
          file={this.state.blob}
          imageCallback={this.imageCallback}
      />
    }

  }
}
export default HostCrop;