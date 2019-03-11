import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class Setup extends React.Component {
  constructor(props) {
    super(props);

    props.setHost();
  }

  render() {
    return (
        <div>
          <h1>Host - Set up Divvy</h1>
          <div>
            <Link to='/'><Button variant="info">left-arrow</Button></Link>
            <span>Instructions</span>
            <Link to='/room'><Button variant="info">right-arrow</Button></Link>
          </div>
        </div>
      );
  }
}
export default Setup;
