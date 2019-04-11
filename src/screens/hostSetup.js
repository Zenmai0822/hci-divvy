import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import CanvasImgCropper from '../components/canvasImgCropper';
import ItemCropper from '../components/itemCropper';
import TotalAndTaxInput from '../components/totalAndTaxInput'

class HostSetup extends Component {
   constructor(props) {
    super(props);
  
    props.setHost();

    this.instructionsText=["Input Tax, Tip, and Subtotal", "Tap the corners around the items section", "Starting at the top, tap and drag to separate items"];
    this.childTriggers = Array(this.instructionsText.length);
    this.state = {
      blob: null,
      curInstructionInd: 0,
      height: props.viewHeight,
      width: props.viewWidth
    };
    this.imageCallback = this.imageCallback.bind(this);
    this.moveChildForward = this.moveChildForward.bind(this);
    this.moveChildBackward = this.moveChildBackward.bind(this);
    this.genCropper = this.genCropper.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }
  imageCallback(blob, height, width) {
    this.setState({
      blob: blob,
      height: height,
      width: width
    });
    
    // also move forward
    this.moveForward();
  }
  moveChildForward() {
    this.childTriggers[this.state.curInstructionInd].forward();
  }

  moveChildBackward() {
    this.childTriggers[this.state.curInstructionInd].back();
  }

  moveBackward() {
    if (this.state.curInstructionInd === 0) {
      this.props.history.push("/");
    }
  
    // moving backward means go back to crop / blob is null
    this.setState({ 
      blob: null,  
      curInstructionInd: this.state.curInstructionInd - 1 
    });
  } 
  moveForward(image, height, width) {
    if (this.state.curInstructionInd === this.instructionsText.length - 1) {
      // TODO create room
      let roomCode = "FPLL";

      this.props.addUserToRoom(roomCode);

      this.props.history.push("/room");
    }
    
    if (this.state.curInstructionInd > 0 && this.state.blob == null) {
      // TODO update with better blob?
      this.setState({
        blob: image,
        width: width,
        height: height,
        curInstructionInd: this.state.curInstructionInd + 1  });
      return;
    }
    
    this.setState({ curInstructionInd: this.state.curInstructionInd + 1 });
  }

  genCropper() {
    if (this.state.curInstructionInd !== 0) { 
      if(this.state.blob == null) {
        return <div> 
        <CanvasImgCropper 
          viewWidth={this.props.viewWidth -30} 
          viewHeight={this.props.viewHeight} 
          file={this.props.location.state.file}
          imageCallback={this.imageCallback}
          moveForward={this.moveForward}
          moveBackward={this.moveBackward}
          setTriggers={(triggers) => this.childTriggers[1] = triggers}
          />
        
      </div>;
    } else {
      return <ItemCropper
        viewWidth={this.state.width}
        viewHeight={this.state.height}
        file={this.state.blob}
        imageCallback={this.imageCallback}
        moveForward={this.moveForward}
        moveBackward={this.moveBackward}
        setTriggers={(triggers) => this.childTriggers[2] = triggers}
      />
    }
  }
  }

  genImgOnly() { 
    if (this.state.curInstructionInd === 0) { 
      return <div><img alt='Full Receipt' src={URL.createObjectURL(this.props.location.state.file)} width={this.props.viewWidth - 30}/></div>
    }
  }

  render() {
    let text = this.instructionsText[this.state.curInstructionInd];
    let cropper = this.genCropper();
    let taxtipinput;
    if (this.state.curInstructionInd === 0) { 
      taxtipinput = <TotalAndTaxInput
        moveForward={this.moveForward}
        moveBackward={this.moveBackward}
        setTriggers={(triggers) => this.childTriggers[0] = triggers}
      />
    }
    let imgOnly = this.genImgOnly();
    return (
        <div className="host-setup">
          <div className="d-flex justify-content-around align-items-center host-instructions">
            <Button variant="info" onClick={this.moveChildBackward}>back</Button>
            <span className="host-instructions-text">{text}</span>
            <Button variant="info" onClick={this.moveChildForward}>next</Button>
          </div>
        <hr />
        {taxtipinput}
        <div className="host-cropping">
            {imgOnly}
            {cropper}  
          </div>
        </div>
      );
  }
}
export default HostSetup;
