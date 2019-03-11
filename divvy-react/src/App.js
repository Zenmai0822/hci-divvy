import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Helmet } from 'react-helmet';

import Index from './screens/index';
import HostCrop from './screens/hostCrop';
import DivvyNav from './components/navbar';
function Users() {
  return <h2>Users</h2>;
}


class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

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
      <React.Fragment>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
          />
      </Helmet>
      <Router>
        <div>
         <DivvyNav/>

          <Route path="/" exact component={Index} />
          <Route path="/users/" component={Users} />
          <Route path="/crop/" render={(props) => 
                                        <HostCrop {...props} 
                                                  viewHeight={this.state.height}
                                                  viewWidth={this.state.width}/>}/>
        </div>
      </Router>
      </React.Fragment>
    );
  }
}

export default AppRouter;