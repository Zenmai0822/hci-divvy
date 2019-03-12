import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemModal from './components/itemModal';
import { Link } from 'react-router-dom';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.setModal = this.setModal.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  setModal(index) {
    this.setState({
      activeModal: index
    })
    this.forceUpdate();
  }

  renderItems() {
    return (
      this.state.images.map(function(image, i) {
       return (
          <div className="row" onClick={this.setModal(i)}>
            <p>Stub Text</p>
            {(this.props.activeModal == i ? <ItemModal /> : null)}
          </div>);
      }));
  }

  render() {
    return (
        <div>
          <h1>Divvy Items</h1>
          <div className="row">
          <div className="container">
            {this.renderItems()}
          </div>
        </div>
          <Link to='/waiting'><Button variant="success">Finish</Button></Link>
        </div>
      );
  }
}
export default Room;
