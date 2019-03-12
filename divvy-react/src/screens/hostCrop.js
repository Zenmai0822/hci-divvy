import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import CanvasImgCropper from '../components/canvasImgCropper';
import ItemCropper from '../components/itemCropper';

class HostCrop extends Component {
   constructor(props) {
    super(props);
  
    props.setHost();

    this.instructionsText=["instructions1", "instructions2", "instructions3"];
  
    this.state = {
      blob: null,
      curInstructionInd: 0
    };
    this.imageCallback = this.imageCallback.bind(this);
  }
  imageCallback(blob) {
    this.setState({
      blob: blob
    });
    
    // also move forward
    this.moveForward();
  }

  moveBackward() {
    if (this.state.curInstructionInd == 0) {
      this.props.history.push("/");
    }
  
    // moving backward means go back to crop
    this.setState({ 
      blob: null,  
      curInstructionInd: this.state.curInstructionInd - 1 
    });
  } 
  moveForward() {
    if (this.state.curInstructionInd == this.instructionsText.length - 1) {
      this.props.history.push("/room");
    }
    
    if (this.state.blob == null) {
      // TODO update with better blob?
      this.setState({ blob: this.props.location.state.file });
    }
    
    this.setState({ curInstructionInd: this.state.curInstructionInd + 1 });
  }
  
  genCropper() {
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

  render() {
    let text = this.instructionsText[this.state.curInstructionInd];
    let cropper = this.genCropper();
    return (
        <div className="host-setup">
          <div className="host-cropping">
            {cropper}  
          </div>
          {/* TODO fix styles here */}
          <div className="host-instructions">
            <Button variant="info" onClick={this.moveBackward.bind(this)}>back</Button>
            <span className="host-instructions-text">{text}</span>
            <Button variant="info" onClick={this.moveForward.bind(this)}>next</Button>
          </div>
        </div>
      );
  }
}
export default HostCrop;
