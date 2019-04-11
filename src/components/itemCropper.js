import React, { Component } from 'react';
import CanvasItemSplitter from './canvasItemSplitter';
import { Card } from 'react-bootstrap';
class ItemCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      restImage: URL.createObjectURL(props.file)
    };
    this.itemCallback = this.itemCallback.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }
  componentDidMount() {
    this.props.setTriggers({forward: this.moveForward, back: this.moveBackward});
  }

  moveForward() {
    Promise.all(this.state.images.map((image) => {
      fetch('http://doublewb.xyz/hci/items',
        { method: 'POST',
          headers: { "Content-Type" : "application/json" },
          body: JSON.stringify({room_code: this.props.roomCode, image: image.item.str })
        })})).then(function(){
          this.props.setRoomCode(this.props.roomCode);
          this.props.moveForward();
        }.bind(this));
  }

  moveBackward() {
    if(this.state.images.length === 0) {
      this.props.moveBackward();
    } else {
      const images = [...this.state.images];
      const oldRest = images[images.length - 1].full;
      images.splice(images.length - 1, 1);
      this.setState({
        images: images,
        restImage: oldRest
      });
    }
  }
  itemCallback(itemBlob, baseStr, newRestImageBlob) {
    const joined = [...this.state.images].concat({
      item: { src: URL.createObjectURL(itemBlob),
              str: baseStr },
      full: this.state.restImage,
    });
    this.setState({
      images: joined,
      restImage: URL.createObjectURL(newRestImageBlob)
    });

  }

  render() {
    const renderImages = this.state.images.map((image, index) =>
    <Card key={index.toString()} border='dark' className='m-1'>
      <Card.Header className='p-0'>Item {index + 1}</Card.Header>
      <Card.Img variant="bottom" src={image.item.src} alt='Receipt item' />
    </Card>

  );
    return <div> 
      {renderImages}
      <CanvasItemSplitter 
        viewWidth={this.props.viewWidth} 
        viewHeight={this.props.viewHeight} 
        image={this.state.restImage}
        itemCallback={this.itemCallback}
      />
      
    </div>;
  }
}
export default ItemCropper;