import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import CurrencyFormat from 'react-number-format';

class TotalAndTaxInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billSubtotal: null,
      billTips: null,
      billTaxes: null
    };
    this.updateSubtotal = this.updateSubtotal.bind(this);
    this.updateTips = this.updateTips.bind(this);
    this.updateTaxes = this.updateTaxes.bind(this);
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }

  componentDidMount() {
    this.props.setTriggers({forward: this.moveForward, back: this.moveBackward});
  }

  updateSubtotal(values) {
    const {value} = values;
    this.setState({
      billSubtotal: parseFloat(value),
    })
  }

  updateTips(values) {
    const {value} = values;
    this.setState({
      billTips: parseFloat(value),
    })
  }

  updateTaxes(values) {
    const {value} = values;
    this.setState({
      billTaxes: parseFloat(value),
    })
  }

  moveForward() {
    this.props.setTaxTipTotal(this.state.billTaxes, this.state.billTips, this.state.billSubtotal);
    this.props.moveForward({tax: this.state.billTaxes, tip: this.state.billTips, total: this.state.billSubtotal});
  }

  moveBackward() {
    this.props.moveBackward();
  }


  render() {
    return <div> 
          <Container>
            <Form>
              <Form.Group as={Row} controlId="billSubtotal">
                <Form.Label column xs="6">Bill Subtotal:</Form.Label>
                <Col xs="6">
                  <CurrencyFormat
                    thousandSeparator={true}
                    decimalScale={2}
                    customInput={Form.Control}
                    fixedDecimalScale={true}
                    value={this.state.billSubtotal}
                    prefix={'$'}
                    placeholder="$"
                    onValueChange={this.updateSubtotal}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="billTips">
                <Form.Label column xs="6">Tips / Gratuities:</Form.Label>
                <Col xs="6">
                  <CurrencyFormat
                    thousandSeparator={true}
                    decimalScale={2}
                    customInput={Form.Control}
                    fixedDecimalScale={true}
                    value={this.state.billTips}
                    prefix={'$'}
                    placeholder="$"
                    onValueChange={this.updateTips}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="billTaxes">
                <Form.Label column xs="6">Taxes:</Form.Label>
                <Col xs="6">
                  <CurrencyFormat
                    thousandSeparator={true}
                    decimalScale={2}
                    customInput={Form.Control}
                    fixedDecimalScale={true}
                    value={this.state.billTaxes}
                    prefix={'$'}
                    placeholder="$"
                    onValueChange={this.updateTaxes}/>
                </Col>
              </Form.Group>
            </Form>
          </Container>
      </div>;
  }
}

export default TotalAndTaxInput;

