import React from 'react';
import logo from '../logo.svg';
import { Navbar } from 'react-bootstrap';
import  getColor from './userColor';

class DivvyNav extends React.Component {
  genNavText() {
    return this.props.roomCode && <Navbar.Text>Room: {this.props.roomCode}</Navbar.Text>;
  }

  render() {
    let roomCodeText = this.genNavText();
    const userColor = this.props.user !== null ?
      <div className={'d-flex align-items-center'}>
        <Navbar.Text className='mr-3'> Your Color: </Navbar.Text>
        <div className={'mr-3'}
             style={{backgroundColor: getColor(this.props.user.user_id), width: '2rem', height: '2rem'}}/></div> :
      <></>;
    return <Navbar bg="light" className='justify-content-between'>
            <div className={'d-flex align-items-center'}>
              <img
	            src={logo}
	            width="30"
	            height="30"
	            className="d-inline-block align-top"
	            alt="React Bootstrap logo"
              />
              <Navbar.Brand>Divvy</Navbar.Brand>
            </div>
            {roomCodeText}
            {userColor}
        	</Navbar>;
  }
}
export default DivvyNav;

