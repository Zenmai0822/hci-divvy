import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemModal from '../components/itemModal';
import DivvyItem from '../components/divvyItem';
import { Link } from 'react-router-dom';

class Splitting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: -1,
      showModal: false,
      selectedCost: null,
      selectedAmount: null,
    };
    this.onModalButton = this.onModalButton.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }
  onModalButton(cost, amount) {
    const item = this.props.room.items[this.state.activeModal];
    fetch('http://doublewb.xyz/hci/amounts',
      { method: 'POST',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({room_code: this.props.room.code,
          user_id: this.props.user.user_id,
          amount: amount,
          item_id: item.id})
      }).then(result => {return result.json()})
        .then(function(result) {console.log("updated item");console.log(result); this.hideModal()}.bind(this));
  }

  render() {
    const items = this.props.room ? this.props.room.items : [];
    return (
      <div>
        <h1>Divvy Items</h1>
        <div className="row">
          <div className="container">
            {items.map(function(item, i) {
              //const item.amount.index
              return (
                <div key={i}> <DivvyItem item={item} user={this.props.user}
                           onItemClick={() => this.setState({
                             activeModal: i,
                             showModal: true,
                             modalImage: item.image,
                             selectedItemIndex: i,
                             selectedAmount: null, //TODO figure out how to get amount from splits
                             selectedCost: item.cost
                           })}
                /></div>);
            }, this)}
          </div>
          <ItemModal receiptImage={this.state.modalImage}
                     showModal={this.state.showModal}
                     amount={null} //TODO
                     cost={this.state.activeModal !== -1 ? items[this.state.activeModal] : 0}
                     onHide={this.hideModal}
                     onButtonClick={this.onModalButton} />
        </div>
        <div className="row my-2 mx-0">
          <Link to='/waiting'><Button variant="success">Finish</Button></Link>
        </div>
      </div>);
  }
}
export default Splitting;
