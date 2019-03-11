import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Index extends React.Component {
  render() {
    return (
        <div className="screen">
          <h1>Hello, welcome to Divvy</h1>
          <div className="divvy-upload">
            <Link to='/upload'><Button className="btn-upload" variant="success" size="lg" block>Upload</Button></Link>
          </div>
          <div className="divvy-join">
            <form>
              <input type="text" name="roomCode" className="input-roomcode" placeholder="Room code" />
              <br />
              <Link to='/room'><Button className="btn-join" variant="primary" size="lg" block>Join</Button></Link>
            </form>
          </div>
        </div>
      );
  }
}
export default Index;
