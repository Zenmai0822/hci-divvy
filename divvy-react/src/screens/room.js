import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemModal from './components/itemModal';
import { Link } from 'react-router-dom';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: props.images,
      modals: {},
    };

    this.setModal = this.setModal.bind(this);
  }

  setModal(index) {
    this.state.modal[index] = true;
    this.forceUpdate();
  }

  render() {
    return (
        <div>
          <h1>Divvy Items</h1>
          <div className="row">
          <div className="container">
            {this.state.images.map(function(image, i) {
              return (
                <div className="row" onClick={this.setModal(i)}>
                  <img src={image} />
                  {(this.state.modal[index] ? <ItemModal /> : null)}
                </div>);
            })}
          </div>
        </div>
          <Link to='/waiting'><Button variant="success">Finish</Button></Link>
        </div>
      );
  }
}
export default Room;
