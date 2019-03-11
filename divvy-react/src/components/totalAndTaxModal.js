import React, { Component } from 'react';
import { Text } from 'react';
import logo from '../logo.svg';
import { Modal, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

class TotalAndTaxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billSubtotal: 0,
      billTaxTips: 0,
      billTotal: 0
    }
    this.updateTotal = this.updateTotal.bind(this);
  }

  updateTotal(event) {
    console.log(event);
    this.setState({
      billSubtotal: event.target.billSubtotal,
      billTaxTips: event.target.billTaxTips,
      billTotal: this.state.billSubtotal + this.state.billTaxTips
    })
  }

  render() {
    return <Modal.Dialog>
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
                  //value={this.state.billSubtotal}
                  //onChange={this.updateTotal}
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
                  //value={this.state.billTaxTips}
                  //onChange={this.updateTotal}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Row>
              <Col xs="6"><b>Bill Total: </b></Col>
              <Col xs="6" className="text-right">${this.state.billTotal}</Col>
            </Row>
          </Form>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal.Dialog>;
  }
}

const btnStyle = {
  'display': 'flex',
  'justify-content': 'center',
  'align-items': 'center',
};
export default TotalAndTaxModal;

