import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { Helmet } from 'react-helmet';
import $ from 'jquery';

import Index from './screens/index';

import HostSetup from './screens/hostSetup';
import Room from './screens/room';
import Splitting from './screens/splitting';
import Waiting from './screens/waiting';
import Bill from './screens/bill';
import Ending from './screens/ending';
import Finish from './screens/finish';
import DivvyNav from './components/navbar';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0, 
      initialRoomFetch: false,
      isHost: false,
      roomCode: null, /* need this for displaying the roomCode in the nav */
      room: null,
      user: null
    };
    this.addUserToRoom = this.addUserToRoom.bind(this);
    this.setHost = this.setHost.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateItems = this.updateItems.bind(this);
    this.updateItemsWithImages = this.updateItemsWithImages.bind(this);
    this.setRoomCode = this.setRoomCode.bind(this);
  }

  //This is all to pass around the size of the screen so we can use it for canvas and image sizing. 
  //Probably not the most elegant way of doing it, but it seems to work. And on mobile the screen should
  // not be changing enough to slow things down (I hope).
  componentDidMount() {
    this.timer = setInterval(()=> {
        if (this.state.initialRoomFetch) 
          { this.updateItems() }
      }, 5000);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    this.timer = null;
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  updateItems() {
    if(this.state.roomCode !== null) {
      fetch('https://doublewb.xyz/hci/rooms/' + this.state.roomCode)
        .then(result => {return result.json()})
        .then(function(result) {
            // assumes room has already been updated at least once
            let oldItems = this.state.room.items;
            let newItems = result.items;
            for (let i = 0; i < oldItems.length; i++) {
              newItems[i].image = oldItems[i].image;
            }
  
            let newRoom = Object.assign({}, result, {items: newItems})
            this.setState({ room: newRoom })
            
          }.bind(this));
    }
  }

  updateItemsWithImages(roomCode = null) {
    let code = this.state.roomCode || roomCode
    if(code !== null) {
      fetch('https://doublewb.xyz/hci/rooms/'+ code + '?images=true')
        .then(result => {return result.json()})
        .then(function(result) {this.setState({ room: result, initialRoomFetch: true })}.bind(this));
    }
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

  addUserToRoom(roomCode, successCallback = (resp) => {}, errorCallback = (resp) => {}) {
    // TODO replace with service call
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://doublewb.xyz/hci/join_room",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "processData": false,
      "data": "{\"room_code\":\"" + roomCode + "\"}"
    };

    let doneCallback = (resp) => {
      console.log("set user ");
      console.log(resp);
      this.setState({ user: resp });
      successCallback(resp);
    };
    $.ajax(settings).done(doneCallback).fail(errorCallback);
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
          <div className="container-fluid screen">
            <Route path="/" exact render={(props) => <Index {...props} 
                  setRoomCode={this.setRoomCode} 
                  addUserToRoom={this.addUserToRoom} 
                  initialFetch={this.updateItemsWithImages} /> } />
            <Route path="/hostsetup/" render={(props) => 
                                            <HostSetup {...props} 
                                                      setHost={this.setHost}
                                                      viewHeight={this.state.height}
                                                      viewWidth={this.state.width}
                                                      setRoomCode={this.setRoomCode}
                                                      initialFetch={this.updateItemsWithImages}
                                                      addUserToRoom={this.addUserToRoom} /> } />
            <Route path="/room/" render={(props) => <Room {...props} isHost={this.state.isHost}
                                                          user={this.state.user}
                                                          room={this.state.room}/> } />
            <Route path="/splitting/" component={Splitting} />
            <Route path="/waiting/" render={(props) => <Waiting {...props} isHost={this.state.isHost} /> } />
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
