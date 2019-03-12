import React, { Component } from 'react';
import { Text } from 'react';
import { Modal, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

class TotalAndTaxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billSubtotal: 0,
      billTaxTips: 0,
    }
    this.updateSubtotal = this.updateSubtotal.bind(this);
    this.updateTips= this.updateTips.bind(this);
  }

  updateSubtotal(event) {
    this.setState({
      billSubtotal: event.target.value,
    })
  }

  updateTips(event) {
    this.setState({
      billTaxTips: event.target.value,
    })
  }

  render() {
    return <div> 
      <Modal show={this.props.showModal} onHide={this.props.onHide} >
        <Modal.Header closeButton>
          <Modal.Title>Bill Amount</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form>
              <Form.Group as={Row} controlId="billSubtotal">
                <Form.Label column xs="6">Bill Subtotal:</Form.Label>
                <Col xs="6">
                  <Form.Control type="number"
                    min="0"
                    step="0.01"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    placeholder="$"
                    onChange={this.updateSubtotal}
                    ></Form.Control>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="billTipsTaxes">
                <Form.Label column xs="6">Taxes and Gratuities:</Form.Label>
                <Col xs="6">
                  <Form.Control type="number"
                    min="0"
                    step="0.01"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    placeholder="$"
                    onChange={this.updateTips}
                  ></Form.Control>
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.props.onButtonClick}>Save changes</Button>
        </Modal.Footer>
      </Modal></div>;
  }
}

export default TotalAndTaxModal;

