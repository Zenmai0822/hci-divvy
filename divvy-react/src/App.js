import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Helmet } from 'react-helmet';

import Index from './screens/index';
import Room from './screens/room';
import Setup from './screens/setup';
import DivvyNav from './components/navbar';
function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Upload() {
  return <Link to='/setup'>Finished upload</Link>;
}

function Stub() {
  return <h2>This is a stub</h2>;
}

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isHost: false,
      roomCode: null  /* need this for displaying the roomCode in the nav */
    }; 
  }

  setHost() {
    this.setState({ isHost: true });
  }

  // TODO call this if user backs out of host flow
  setNonHost() {
    this.setState({ isHost: false })
  }

  setRoomCode(roomCode) {
    this.setState({ roomCode: roomCode }); 
  }

  render() {
    return (
      <Router>
        <div>
          <Helmet>
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
              integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
              crossorigin="anonymous"
            />
          </Helmet>
         <DivvyNav roomCode={this.state.roomCode} />
  
          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          {/* stubs */} 
          <Route path="/room/" render={(props) => <Room {...props} isHost={this.state.isHost} setRoomCode={this.setRoomCode.bind(this)} /> } /> {/* might need to move setRoomCode later */}
          <Route path="/setup/" render={(props) => <Setup {...props} setHost={this.setHost.bind(this)} /> } />
          <Route path="/upload/" component={Upload} />
          <Route path="/waiting/" component={Stub} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
