import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
class Ending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      denom: 1
    };

    this.sleep = this.sleep.bind(this);
    this.pretendJoining = this.pretendJoining.bind(this);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  pretendJoining = async() => {
    this.setState({
      denom: 2
    });
    await this.sleep(750);
    this.setState({
      num: 2
    });
    await this.sleep(750);
    this.setState({
      denom: 3
    });
    await this.sleep(750);
    this.setState({
      num: 3
    });
  }

  componentDidMount() {
    this.pretendJoining()
  }

  render() {
    return (
      <div>
        <h1>Room Members Finished:</h1>
          <div>
            <h1>{this.state.num}/{this.state.denom}</h1>
          </div>
        <Link to='/bill'><Button disabled={this.state.num != this.state.denom} variant="success">End Divvy!</Button></Link>
      </div>
    );
  }
}
export default Ending;