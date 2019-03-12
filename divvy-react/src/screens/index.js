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
