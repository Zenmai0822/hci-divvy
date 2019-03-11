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
              <Col xs="6" className="text-right">{this.state.billTotal}</Col>
            </Row>
          </Form>
          <hr></hr>
          <Row className="pb-2">
            <Col>Compated to others, you had:</Col>
          </Row>
          <Row p-5>
            <Col className="justify-content-center">
              <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="ratio" size="sm">
                  <ToggleButton variant="danger" value={1} style={btnStyle}>Much Less</ToggleButton>
                  <ToggleButton variant="warning" value={2} style={btnStyle}>Less</ToggleButton>
                  <ToggleButton variant="success" value={3} style={btnStyle}>Average</ToggleButton>
                  <ToggleButton variant="warning" value={4} style={btnStyle}>More</ToggleButton>
                  <ToggleButton variant="danger" value={5} style={btnStyle}>Much More</ToggleButton>
                  <ToggleButton variant="info" value={-1} style={btnStyle}>All</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
            </Col>
          </Row>
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

