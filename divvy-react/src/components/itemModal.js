import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

class ItemModal extends React.Component {
  contructor(props) {
    super(props);
  }

  render() {
    <Modal show={this.props.showModal && true} centered>
      <Modal.Header closeButton>
        <Modal.Title>This is a stub</Modal.Title>
      </Modal.Header>
      <Modal.Body>Wow stubs</Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Close?</Button>
      </Modal.Footer>
    </Modal>
  }
}
