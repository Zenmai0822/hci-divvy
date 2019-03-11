import React, { Component } from 'react';

import Upload from '../components/upload';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Index extends Component {
  render() {
    return (
        <div>
          <h1>Hello, welcome to Divvy</h1>
          <Upload />
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
