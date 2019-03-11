import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Index extends React.Component {
  render() {
    return (
        <div>
          <h1>Hello, welcome to Divvy</h1>
          <Link to='/upload'><Button variant="success">Upload</Button></Link>
          <div>
            <form>
              <input type="text" name="roomCode" />
              <br />
              <Link to='/room'><Button variant="primary">Submit</Button></Link>
            </form>
          </div>
        </div>
      );
  }
}
export default Index;
