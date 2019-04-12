import React, { Component } from 'react';

import Upload from '../components/upload';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      roomCode: "",
    };
  }

  onInputChange(ev) {
    this.setState({roomCode: ev.target.value.toUpperCase()});
  }

  // TODO maybe check for room exists?
  render() {
    return (
        <div>
          <h2>Welcome to Divvy!</h2>
          <Upload />
          <div className="divvy-join">
            <form onSubmit={(event) => { event.preventDefault(); event.stopPropagation();}}>
              <input type="text" name="roomCode" className="input-roomcode" placeholder="Room code" onChange={this.onInputChange.bind(this)} />
              <br />
              <Link to='/room' onClick={() => {
                this.props.setRoomCode(this.state.roomCode);
                this.props.addUserToRoom(this.state.roomCode);
                this.props.initialFetch(this.state.roomCode);
                }}>
                <Button className="btn-join" variant="primary" size="lg" block disabled={!this.state.roomCode}>Join existing room</Button>
              </Link>
            </form>
          </div>
        </div>
      );
  }
}
export default Index;
