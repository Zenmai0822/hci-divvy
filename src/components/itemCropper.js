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
  }
  itemCallback(itemBlob, baseStr, newRestImageBlob) {
    const joined = this.state.images.concat({
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