import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import HostCrop from './hostCrop';

class Setup extends React.Component {
  constructor(props) {
    super(props);

    /* TODO include callback props for moveBackward and moveForward */

    /* TODO maybe replace list of strings with a list of component? */
    this.instructionsText=["instructions1", "instructions2", "instructions3"];
    this.state = {
      curInstructionInd: 0
    }    
  }  

  moveBackward() {
    if (this.state.curInstructionInd == 0) {
      this.props.history.push("/");
    }

    this.setState({ curInstructionInd: this.state.curInstructionInd - 1 });
  } 
  moveForward() {
    if (this.state.curInstructionInd == this.instructionsText.length - 1) {
      this.props.history.push("/room");
    }
    
    this.setState({ curInstructionInd: this.state.curInstructionInd + 1 });
  }

  render() {
    let text = this.instructionsText[this.state.curInstructionInd];
    return (
        <div className="screen host-setup">
          <div className="host-cropping">
            <HostCrop {...this.props} />             
          </div>
          <div className="host-instructions">
            <Button variant="info" onClick={this.moveBackward.bind(this)}>back</Button>
            <span className="host-instructions-text">{text}</span>
            <Button variant="info" onClick={this.moveForward.bind(this)}>next</Button>
          </div>
        </div>
      );
  }
}
export default Setup;
