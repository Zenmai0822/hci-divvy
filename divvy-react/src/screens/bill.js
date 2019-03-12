import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 14.67,
    };
  }

  render() {
    return (
      <div>
        <h1>Amount Owed:</h1>
          <div>
            <p>${this.state.total}</p>
          </div>
        <Link to='/finish'><Button variant="success">Pay With Benmo</Button></Link>
      </div>
    );
  }
}
export default Bill;