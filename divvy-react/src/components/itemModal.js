import React, { Component } from 'react';
import logo from '../logo.svg';
import { Modal, ButtonGroup, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form } from 'react-bootstrap';

class ItemModal extends React.Component {
  render() {
    return <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Item Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column xs="8">This item costs:</Form.Label>
              <Col xs="4">
                <Form.Control type="currency" placeholder="$"></Form.Control>
              </Col>
            </Form.Group>
          </Form>
          <hr></hr>
          <Row>
            <Col>Compated to others, you had:</Col>
          </Row>
          <Row>
            <Col className="justify-content-center">
              <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="ratio" size="sm">
                  <ToggleButton variant="danger" value={1}>Much Less</ToggleButton>
                  <ToggleButton variant="warning" value={2}>Less</ToggleButton>
                  <ToggleButton variant="success" value={3}>Average</ToggleButton>
                  <ToggleButton variant="warning" value={4}>More</ToggleButton>
                  <ToggleButton variant="danger" value={5}>Much More</ToggleButton>
                  <ToggleButton variant="info" value={6}>All</ToggleButton>
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
export default ItemModal;

