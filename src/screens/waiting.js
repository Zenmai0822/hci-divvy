import React from 'react';

import Ending from './ending';

class Waiting extends React.Component {
  componentDidMount() {
    setTimeout(function() {this.props.history.push("/bill")}.bind(this), 5000);
  }

  render() {
    if (this.props.isHost) {
      return <Ending />;
    } else {
      return <div className="waiting">
          <h2>Waiting for others to finish...</h2>
        </div>
    }
  }
}

export default Waiting;
