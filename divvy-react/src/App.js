import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { Helmet } from 'react-helmet';

import Index from './screens/index';

import HostCrop from './screens/hostCrop';
import Room from './screens/room';
import Setup from './screens/setup';
import Bill from './screens/bill';
import Ending from './screens/ending';
import Finish from './screens/finish';
import DivvyNav from './components/navbar';

function Stub() {
  return <h2>Stub</h2>;
}


class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0, 
      isHost: false,
      roomCode: null  /* need this for displaying the roomCode in the nav */
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  //This is all to pass around the size of the screen so we can use it for canvas and image sizing. 
  //Probably not the most elegant way of doing it, but it seems to work. And on mobile the screen should
  // not be changing enough to slow things down (I hope).
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
          <DivvyNav/>
          <div className="container-fluid">
            <Route path="/" exact component={Index} />
            <Route path="/crop/" render={(props) => 
                                            <HostCrop {...props} 
                                                      viewHeight={this.state.height}
                                                      viewWidth={this.state.width}/>}/>
            <Route path="/room/" render={(props) => <Room {...props} isHost={this.state.isHost} setRoomCode={this.setRoomCode.bind(this)} /> } /> {/* might need to move setRoomCode later */}
          <Route path="/setup/" render={(props) => 
                                          <Setup {...props} 
                                                    setHost={this.setHost.bind(this)}
                                                    viewHeight={this.state.height}
                                                    viewWidth={this.state.width}/>}/>
            {/* stubs */} 
            <Route path="/waiting/" component={Stub} />
            <Route path="/ending/" component={Ending} />
            <Route path="/bill/" component={Bill} />
            <Route path="/finish/" component={Finish} />
          </div>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
