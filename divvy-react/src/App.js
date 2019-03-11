import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Helmet } from 'react-helmet';

import Index from './screens/index';
import Room from './screens/room';
import Setup from './screens/setup';
import DivvyNav from './components/navbar';
import ItemModal from './components/itemModal';
import TotalAndTaxModal from './components/totalAndTaxModal';

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

function AppRouter() {
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
        <TotalAndTaxModal/>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        {/* stubs */} 
        <Route path="/room/" component={Room} />
        <Route path="/setup/" component={Setup} />
        <Route path="/upload/" component={Upload} />
        <Route path="/waiting/" component={Stub} />
      </div>
    </Router>
  );
}

export default AppRouter;
