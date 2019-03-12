import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import { Helmet } from 'react-helmet';

import Index from './screens/index';

import HostCrop from './screens/hostCrop';
import Room from './screens/room';
import Setup from './screens/setup';
import DivvyNav from './components/navbar';

function Stub() {
  return <h2>Stub</h2>;
}


class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
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
          <Route path="/" exact component={Index} />
          <Route path="/crop/" render={(props) => 
                                          <HostCrop {...props} 
                                                    viewHeight={this.state.height}
                                                    viewWidth={this.state.width}/>}/>
          {/* stubs */} 
          <Route path="/room/" component={Room} />
          <Route path="/setup/" render={(props) => 
                                          <Setup {...props} 
                                                    viewHeight={this.state.height}
                                                    viewWidth={this.state.width}/>}/>
          <Route path="/waiting/" component={Stub} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;
