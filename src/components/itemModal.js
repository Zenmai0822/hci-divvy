import React, { Component } from 'react';
import { Modal, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

class ItemModal extends React.Component {
  render() {
    return <div> 
      <Modal show={this.props.showModal} onHide={this.props.onHide} >
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form>
              <Form.Group as={Row}>
                <div><img src={this.props.receiptImage}/></div>
                <Form.Label column xs="6">This item costs:</Form.Label>
                <Col xs="6">
                  <Form.Control type="number"
                    min="0"
                    step="0.01"
                    data-number-to-fixed="2"
                    data-number-stepfactor="100"
                    placeholder="$"></Form.Control>
                </Col>
              </Form.Group>
            </Form>
            <hr></hr>
            <Row className="pb-2">
              <Col>Compared to others, you had:</Col>
            </Row>
            <Row>
              <Col >
                <ButtonToolbar className="justify-content-center">
                  <ToggleButtonGroup vertical className="btn-block" type="radio" name="ratio" size="lg">
                    <ToggleButton className="ItemModalButton mb-4" variant="info" value={-1} >All</ToggleButton>
                    <ToggleButton className="ItemModalButton" variant="danger" value={1} >Much Less</ToggleButton>
                    <ToggleButton className="ItemModalButton" variant="warning" value={2} >Less</ToggleButton>
                    <ToggleButton className="ItemModalButton" variant="success" value={3} >Average</ToggleButton>
                    <ToggleButton className="ItemModalButton" variant="warning" value={4} >More</ToggleButton>
                    <ToggleButton className="ItemModalButton" variant="danger" value={5} >Much More</ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.props.onButtonClick}>Save changes</Button>
        </Modal.Footer>
    </Modal></div>;
  }
}

export default ItemModal;

