import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

import Splitting from './splitting';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showHostPrompt: props.isHost };
  }

  handleClose() {
    this.setState({ showHostPrompt: false })
  }

  render() {
    if (this.props.user == null) {
      return <div>loading...</div>;
    }


    return (
        <div>
          <Modal show={this.state.showHostPrompt} onHide={this.handleClose.bind(this)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Share this room code!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.room !== null ? this.props.room.code : ''}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Splitting room={this.props.room} user={this.props.user}/>
        </div>
      );
  }
}
export default Room;
