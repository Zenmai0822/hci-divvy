import React from 'react';
import backendService from '../services/backendService';
import Ending from './ending';

class Waiting extends React.Component {
  componentDidMount() {
    this.service = backendService.getInstance();
    if(!this.props.isHost) {
      this.service.userFinished({"room_code":this.props.room.code, "finished":true, "user_id":this.props.user.user_id})
        .then((res)=> {console.log(res)});

    }
  }
  componentDidUpdate(prevProps) {
    if(!this.props.isHost) {
      let doneUsers = 0;
      const users = this.props.room.users;
      const totalUsers = users.length;
      for (let i = 0; i < users.length; i++) {
        if (users[i].finished) {
          doneUsers++;
        }
      }
      if (doneUsers === totalUsers) {
        this.props.history.push('/bill');
      }
    }
  }

  render() {
    if (this.props.isHost) {
      return <Ending {... this.props}/>;
    } else {
      return <div className="waiting">
          <h2>Waiting for others to finish...</h2>
        </div>
    }
  }
}

export default Waiting;
