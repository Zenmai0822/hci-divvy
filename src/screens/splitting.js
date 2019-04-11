import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemModal from '../components/itemModal';
import DivvyItem from '../components/divvyItem';
import { Link } from 'react-router-dom';

function getUserAmount(userId, item) {
  let userAmount = null;
  let itemAmount = item.amount !== null ? item.amount : [];
  for(let i = 0; i < itemAmount.length; i++) {
    const portion = itemAmount[i];
    if(portion.user_id === userId) {
      userAmount = portion.amount;
    }
  }
  return userAmount;
}

class Splitting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: -1,
      showModal: false,
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
    const itemAmount = getUserAmount(this.props.user.user_id, item);
    if(item.price !== cost) {
      fetch('http://doublewb.xyz/hci/items',
        { method: 'PUT',
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({room_code: this.props.room.code,
            price: cost,
            item_id: item.id})
        }).then(result => {return result.json()})
        .then(function(result) {console.log("updated cost");console.log(result);}.bind(this));
    }
    fetch('http://doublewb.xyz/hci/amounts',
      { method: itemAmount === null ? 'POST' : 'PUT',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({room_code: this.props.room.code,
          user_id: this.props.user.user_id,
          amount: amount,
          item_id: item.id})
      }).then(result => {return result.json()})
        .then(function(result) {console.log("updated item amount");console.log(result); this.hideModal()}.bind(this));
  }

  render() {
    const items = this.props.room === null ? [] : (this.props.room.items === null ? [] : this.props.room.items);
    const curAmount = this.state.activeModal !== -1 ?
      getUserAmount(this.props.user.user_id, items[this.state.activeModal]) :
      0;
    return (
      <div>
        <h1>Divvy Items</h1>
        <div className="row">
          <div className="container">
            {items.map(function(item, i) {
              return (
                <div key={i}> <DivvyItem item={item} user={this.props.user}
                           onItemClick={() => this.setState({
                             activeModal: i,
                             showModal: true,
                             modalImage: item.image,
                             selectedItemIndex: i,
                           })}
                /></div>);
            }, this)}
        </div>
        {this.state.showModal ?
        <ItemModal receiptImage={this.state.modalImage}
                   showModal={this.state.showModal}
                   amount={curAmount !== null ? curAmount : 0}
                   cost={this.state.activeModal !== -1 ? items[this.state.activeModal].price : 0}
                   onHide={this.hideModal}
                   onButtonClick={this.onModalButton} /> : <></>}
      </div>
      <div className="row my-2 mx-0">
        <Link to='/waiting'><Button variant="success">Finish</Button></Link>
      </div>
      </div>);
  }
}
export default Splitting;
