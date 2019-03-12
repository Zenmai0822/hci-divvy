import React from 'react';

class Waiting extends React.Component {
  componentDidMount() {
    setTimeout(function() {this.props.history.push("/bill")}.bind(this), 5000);
  }

  render() {
    return <div className="waiting">
        <h2>Waiting for others to finish...</h2>
      </div>
  }
}

export default Waiting;
