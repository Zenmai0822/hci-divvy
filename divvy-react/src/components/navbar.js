import React, { Component } from 'react';
import logo from '../logo.svg';
import { Navbar } from 'react-bootstrap';

class DivvyNav extends Component {
  render() {
    return <Navbar bg="light">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
              />
            <Navbar.Brand>Divvy</Navbar.Brand>
          </Navbar>;
  }
}
export default DivvyNav;

 