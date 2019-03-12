import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import Splitting from './splitting';

class Room extends React.Component {
  constructor(props) {
    super(props);
    
    this.roomCode = "abcd";

    props.setRoomCode(this.roomCode);
    this.state = { showHostPrompt: props.isHost };
  }

  handleClose() {
    this.setState({ showHostPrompt: false })
  }

  render() {
    return (
        <div>
          <Modal show={this.state.showHostPrompt} onHide={this.handleClose.bind(this)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Share this room code!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.roomCode}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Splitting />
        </div>
      );
  }
}
export default Room;
