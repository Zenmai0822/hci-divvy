import React from 'react';
import classNames from 'classnames';
import { Modal, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

class ItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cost: props.cost,
      amount: props.amount,
    };
    this.onAmountPressed = this.onAmountPressed.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  onAmountPressed(e) {
    this.setState({amount: parseInt(e.target.value)})
  }
  toggleButton(type, value, text) {

    const classes = classNames('ItemModalButton', {
      'mb-4': value === -1,
      'active': this.state.amount === value
    });
    return <ToggleButton
      className={classes}
      variant={type}
      value={value}
      key={value}
      active={this.props.amount === value}
      onChange={this.onAmountPressed}>{text}</ToggleButton>
  }
  render() {
    const buttons = [{type: 'info', value: 6, text: "All"},
      {type: 'danger', value: 1, text: "Much Less"},
      {type: 'warning', value: 2, text: "Less"},
      {type: 'success', value: 3, text: "Average"},
      {type: 'warning', value: 4, text: "More"},
      {type: 'danger', value: 5, text: "Much More"}
    ].map(val =>  this.toggleButton(val.type,val.value,val.text));
    return <div> 
      <Modal show={this.props.showModal} onHide={this.props.onHide} >
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form>
              <Form.Group as={Row}>
                <div className='w-100 pb-1'><img className='w-100' alt='receipt item' src={this.props.receiptImage}/></div>
                <Form.Label column xs="6">This item costs:</Form.Label>
                <Col xs="6">
                  <Form.Control type="number"
                    min="0"
                    step="0.01"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    placeholder="$"
                    value={this.state.cost ? this.state.cost : ''}
                    onChange={(e) => this.setState({cost: e.target.value !== '' ? parseFloat(e.target.value) : ''})}/>
                </Col>
              </Form.Group>
            </Form>
            <hr/>
            <Row className="pb-2">
              <Col>Compared to others, you had:</Col>
            </Row>
            <Row>
              <Col >
                <ButtonToolbar className="justify-content-center">
                  <ToggleButtonGroup vertical className="btn-block" type="radio" name="ratio" size="lg">
                    {buttons}
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => this.props.onButtonClick(this.state.cost === '' ? 0 :   this.state.cost, this.state.amount)}>Save changes</Button>
        </Modal.Footer>
    </Modal></div>;
  }
}

export default ItemModal;

