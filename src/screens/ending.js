import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import backendService from '../services/backendService';
class Ending extends Component {
  constructor(props) {
    super(props);
    this.finishClick = this.finishClick.bind(this);
  }

  componentDidMount() {
    this.service = backendService.getInstance();
  }

  finishClick() {
      this.service.userFinished({"room_code":this.props.room.code, "finished":true, "user_id":this.props.user.user_id})
        .then(function(){this.props.history.push('/bill')}.bind(this));
  }
  render() {
    let doneUsers = 0;
    const users = this.props.room.users;
    const totalUsers = users.length;
    for(let i = 0; i < users.length; i++){
      if(users[i].finished) { doneUsers++;}
    }
    return (
      <div>
        <h1>Room Members Finished:</h1>
          <div>
            <h1>{doneUsers + 1}/{totalUsers}</h1>
          </div>
        <Button disabled={doneUsers !== totalUsers - 1} variant="success" onClick={this.finishClick}>End Divvy!</Button>
      </div>
    );
  }
}
export default Ending;