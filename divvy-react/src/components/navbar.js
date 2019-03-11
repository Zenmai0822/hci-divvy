import React from 'react';
import logo from '../logo.svg';
import { Navbar } from 'react-bootstrap';

class DivvyNav extends React.Component {
  constructor(props) {
    super(props);
  }

  genNavText() {
    return this.props.roomCode && <Navbar.Text>Room: {this.props.roomCode}</Navbar.Text>;
  }

  render() {
    let roomCodeText = this.genNavText();

    return <Navbar bg="light">
            <img
	            src={logo}
	            width="30"
	            height="30"
	            className="d-inline-block align-top"
	            alt="React Bootstrap logo"
	            />
      		  <Navbar.Brand>Divvy</Navbar.Brand>
            {roomCodeText}
        	</Navbar>;
  }
}
export default DivvyNav;

 
