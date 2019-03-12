import React from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

class ItemModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
    <Modal show={this.props.showModal && true} onHide={this.props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>This is a stub</Modal.Title>
      </Modal.Header>
      <Modal.Body>Wow stubs</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.props.onButtonClick}>Close?</Button>
      </Modal.Footer>
    </Modal></div>
  }
}

export default ItemModal;

