import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemModal from '../components/itemModal';
import DivvyItem from '../components/divvyItem';
import { Link } from 'react-router-dom';
import image1 from '../mightySquirell.png';
import image2 from '../taterTots.png';
import image3 from '../crabCakes.png';
import image4 from '../calamari.png';
import image5 from '../cheeseCake.png';

class Splitting extends React.Component {
  constructor(props) {
    super(props);
    const items = []; //TODO add backend support
    items.push({image: image1,
                cost: 12.00,
                splits: [
                  {color:'blue', size:1},
                  {color:'green', size:2},
                ]});
    items.push({image: image2, cost: 0, splits:[]});
    items.push({image: image3, cost: 0, splits:[]});
    items.push({image: image4, cost: 0, splits:[]});
    items.push({image: image5, cost: 0, splits:[]});
    this.state = {
      activeModal: -1,
      items: items,
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
    // 1. Make a shallow copy of the items
    let items = [...this.state.items];
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[this.state.activeModal]};
    // 3. Replace the property you're interested in
    let splits = item.splits;
    splits.push({color:'red', size:amount});
    item.splits = splits;
    item.cost = cost;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[this.state.activeModal] = item;
    // 5. Set the state to our new copy
    this.setState({
      items: items,
      showModal: false,
    });
  }

  render() {
    return (
      <div>
        <h1>Divvy Items</h1>
        <div className="row">
          <div className="container">
            {this.state.items.map(function(item, i) {
              return (
                <DivvyItem item={item}
                           onItemClick={() => this.setState({
                             activeModal: i,
                             showModal: true,
                             modalImage: item.image,
                             selectedItemIndex: i,
                             selectedAmount: null, //TODO figure out how to get amount from splits
                             selectedCost: item.cost
                           })}
                />);
            }, this)}
          </div>
          <ItemModal receiptImage={this.state.modalImage}
                     showModal={this.state.showModal}
                     amount={this.state.selectedAmount}
                     cost={this.state.selectedCost}
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
