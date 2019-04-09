import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import CanvasImgCropper from '../components/canvasImgCropper';
import ItemCropper from '../components/itemCropper';
import TotalAndTaxInput from '../components/totalAndTaxInput'
  
class HostSetup extends Component {
   constructor(props) {
    super(props);
  
    props.setHost();

    this.instructionsText=["Input Tax, Tip, and Subtotal", "Tap the corners around the items section", "Separate line items"];
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
    if (this.state.curInstructionInd === 0) {
      this.props.history.push("/");
    }
  
    // moving backward means go back to crop / blob is null
    this.setState({ 
      blob: null,  
      curInstructionInd: this.state.curInstructionInd - 1 
    });
  } 
  moveForward() {
    if (this.state.curInstructionInd === this.instructionsText.length - 1) {
      this.props.history.push("/room");
    }
    
    if (this.state.curInstructionInd > 0 && this.state.blob == null) {
      // TODO update with better blob?
      this.setState({ blob: this.props.location.state.file });
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

  genImgOnly() { 
    if (this.state.curInstructionInd === 0) { 
      return <div><img alt='Full Receipt' src={URL.createObjectURL(this.props.location.state.file)} width={this.props.viewWidth - 30}/>></div>
    }
  }

  render() {
    let text = this.instructionsText[this.state.curInstructionInd];
    let cropper = this.genCropper();
    let taxtipinput;
    if (this.state.curInstructionInd === 0) { 
      taxtipinput = <TotalAndTaxInput/>
    }
    let imgOnly = this.genImgOnly();
    return (
        <div className="host-setup">
          {/* TODO fix styles here */}
          <div className="d-flex justify-content-around align-items-center host-instructions">
            <Button variant="info" onClick={this.moveBackward.bind(this)}>back</Button>
            <span className="host-instructions-text">{text}</span>
            <Button variant="info" onClick={this.moveForward.bind(this)}>next</Button>
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
