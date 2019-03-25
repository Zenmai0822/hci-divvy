import React from 'react';
import Button from 'react-bootstrap/Button';
import ItemModal from '../components/itemModal';
import { Link } from 'react-router-dom';
import image1 from '../mightySquirell.png';
import image2 from '../taterTots.png';
import image3 from '../crabCakes.png';
import image4 from '../calamari.png';
import image5 from '../cheeseCake.png';

class Splitting extends React.Component {
  constructor(props) {
    super(props);
    var imgs = [];
    imgs.push(image1);
    imgs.push(image2);
    imgs.push(image3);
    imgs.push(image4);
    imgs.push(image5);
    this.state = { 
        activeModal: -1,
        images: imgs,
        showModal: false
    };
    this.getSetModal = this.getSetModal.bind(this);
  }

  hideModal() {
    console.log("oh");
     this.setState({showModal: false});
  }

  getSetModal(index) {
      return function () {
        this.setState({
            activeModal: index,
            showModal: true
          })
      }.bind(this)
  }

    render() {
      console.log("render");
        return (
            <div>
              <h1>Divvy Items</h1>
              <div className="row">
                <div className="container">
                    {this.state.images.map(function(image, i) {
                        return (
                            <div className="row divvy-item" onClick={this.getSetModal(i)}>
                                <div><img src={image}/></div>
                                {/*(this.state.activeModal == i ? <div><ItemModal showModal={() => {this.state.showModal}} onHide={this.hideModal.bind(this)} onButtonClick={this.hideModal.bind(this)} /></div> : null)*/}
                            </div>);
                        }, this)}
                </div>
                <ItemModal showModal={this.state.showModal} onHide={this.hideModal.bind(this)} onButtonClick={this.hideModal.bind(this)} />
                </div>
              <Link to='/waiting'><Button variant="success">Finish</Button></Link>
            </div>);
    }
}
export default Splitting;
