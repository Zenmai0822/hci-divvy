import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

class TotalAndTaxInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billSubtotal: 0,
      billTips: 0,
      billTaxes: 0
    };
    this.updateSubtotal = this.updateSubtotal.bind(this);
    this.updateTips = this.updateTips.bind(this);
    this.updateTaxes = this.updateTaxes.bind(this);
  }

  updateSubtotal(event) {
    this.setState({
      billSubtotal: event.target.value,
    })
  }

  updateTips(event) {
    this.setState({
      billTips: event.target.value,
    })
  }

  updateTaxes(event) {
    this.setState({
      billTaxes: event.target.value,
    })
  }

  render() {
    return <div> 
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
                    />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="billTips">
                <Form.Label column xs="6">Tips / Gratuities:</Form.Label>
                <Col xs="6">
                  <Form.Control type="number"
                    min="0"
                    step="0.01"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    placeholder="$"
                    onChange={this.updateTips}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="billTaxes">
                <Form.Label column xs="6">Taxes:</Form.Label>
                <Col xs="6">
                  <Form.Control type="number"
                    min="0"
                    step="0.01"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    placeholder="$"
                    onChange={this.updateTaxes}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Container>
      </div>;
  }
}

export default TotalAndTaxInput;

