import React, { Component } from 'react';
import CanvasItemSplitter from './canvasItemSplitter';

class ItemCropper extends Component {
   constructor(props) {
    super(props);
    this.state = {
      images: [],
      restImage: URL.createObjectURL(props.file)
    };
    this.itemCallback = this.itemCallback.bind(this);
  }
  itemCallback(item, newRestImage) {
    var joined = this.state.images.concat({
      item: URL.createObjectURL(item),
      full: this.state.restImage,
    })
    this.setState({
      images: joined,
      restImage: URL.createObjectURL(newRestImage)
    });

  }

  render() {
    const renderImages = this.state.images.map((image, index) =>
    <img src={image.item} key={index.toString()}/>

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