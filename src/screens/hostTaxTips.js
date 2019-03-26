import React, { Component, Image } from 'react';
import Button from 'react-bootstrap/Button';
import CanvasImgCropper from '../components/canvasImgCropper';
import ItemCropper from '../components/itemCropper';
import TotalAndTaxModal from '../components/totalAndTaxModal';
import HostCrop from "./hostCrop"

class HostTaxTips extends Component {
  constructor(props) {
    super(props);

    props.setHost();

    this.instructionsText = ["Input tax & total"];

    this.state = {
      blob: null,
      curInstructionInd: 0
    };
    this.imageCallback = this.imageCallback.bind(this);
  }
  imageCallback(blob) {
    console.log("!")
    this.setState({
      blob: blob
    });

    // also move forward
    this.moveForward();
  }

  moveBackward() {
    this.props.history.push("/");

    // moving backward means go back to crop / blob is null
    this.setState({
      blob: null,
      curInstructionInd: this.state.curInstructionInd - 1
    });
  }
  moveForward() {
    this.props.history.push({
      pathname: "/crop",
      state: { file: this.props.location.state.file }});
    this.setState({ file: this.props.location.state.file });

    this.setState({ curInstructionInd: this.state.curInstructionInd + 1 });
  }


  render() {
    let text = this.instructionsText[this.state.curInstructionInd];
    console.log(this.props)
    return (
      <div className="host-setup">
        {/* TODO fix styles here */}
        <div className="d-flex justify-content-around align-items-center host-instructions">
          <Button variant="info" onClick={this.moveBackward.bind(this)}>back</Button>
          <span className="host-instructions-text">{text}</span>
          <Button variant="info" onClick={this.moveForward.bind(this)}>next</Button>
        </div>
        <hr />
        <div className="host-img">
          <img src={URL.createObjectURL(this.props.location.state.file)} width={this.props.viewWidth - 30} height={this.props.viewHeight - 30}></img>
        </div>
        <div className="my-3">
          <TotalAndTaxModal />
        </div>
      </div>
    );
  }
}
export default HostTaxTips;
