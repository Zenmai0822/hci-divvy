import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Room extends React.Component {
  render() {
    return (
        <div>
          <h1>Divvy Items</h1>
          <Link to='/waiting'><Button variant="success">Finish</Button></Link>
        </div>
      );
  }
}
export default Room;
