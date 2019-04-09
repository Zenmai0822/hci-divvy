import React, { Component } from 'react';
import CanvasItemLine from './canvasItemLine'
import PerspectiveCrop from './perspectiveCrop'
class CanvasItemSplitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      end: null,
      itemImg: null,
      restImg: null,
    };
    this.touchEnd = this.touchEnd.bind(this);
    this.itemImageCallback = this.itemImageCallback.bind(this);
    this.restImageCallback = this.restImageCallback.bind(this);
  }

  //If the image is updated update the state so we are ready to 
  //make a new item. 
  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  if (nextProps.image !== this.state.image) {
    this.setState({ 
      image: nextProps.image,
      start: null,
      end: null,
      itemImg: null,
      restImg: null,
      baseStr: null,
    });
  }
}
  //Between item and rest image callback we will call item callback
  //once both have been called. They get the image back from 
  //Perspective crop and give it to the callback. 
  itemImageCallback(img, baseStr) {
    if (this.state.restImg == null) {
      this.setState({
        itemImg: img,
        baseStr: baseStr
      });
    } else {
      this.props.itemCallback(img, baseStr, this.state.restImg)
    }
  }

  restImageCallback(img) {
    if (this.state.itemImg == null) {
      this.setState({
        restImg: img
      });
    } else {
      this.props.itemCallback(this.state.itemImg, this.state.baseStr, img)
    }
  }

  touchEnd(start, end) {
    this.setState({
      start: start,
      end: end,
    })
  }

  render() {
    if(this.state.start == null ||
       this.state.end == null ) {
      return <CanvasItemLine
              touchEnd={this.touchEnd} 
              width={this.props.viewWidth}
              height={this.props.viewHeight}
              image={this.props.image}
             />;
    }
    else{
      let orignalHeight = Math.max(this.state.end.y, this.state.start.y);
      let leftPoint = this.state.start;
      let rightPoint = this.state.end;
      if(leftPoint.x > rightPoint.x) {
        leftPoint = this.state.end;
        rightPoint = this.state.start;
      }
      //Add padding to allow for users to not be exact with their selections
      const padding = 5;

      //These perspetive crops are hidden and we are only really using them to crop
      // and then use their callbacks so we can have the resulting cropped images in a
      //easier to use format
      return <div className="d-none">
                <PerspectiveCrop
                  image={this.props.image}
                  width={this.props.viewWidth}
                  height={orignalHeight}
                  imageCallback={this.itemImageCallback}
                  anchors={{
                    TL:{x:0,y:0},     
                    TR:{x:this.props.viewWidth,y:0},
                    BR:{x:this.props.viewWidth,y:rightPoint.y + padding},
                    BL:{x:0,y:leftPoint.y + padding}
                  }}
                  unwarped={{
                    TL:{x:0,y:0},
                    TR:{x:this.props.viewWidth,y:0},
                    BR:{x:this.props.viewWidth,y:orignalHeight + padding},
                    BL:{x:0,y:orignalHeight + padding},
                  }}
                />
                <PerspectiveCrop
                  image={this.props.image}
                  width={this.props.viewWidth}
                  height={this.props.viewHeight - orignalHeight}
                  imageCallback={this.restImageCallback}
                  anchors={{
                    TL:{x:0,y:leftPoint.y - padding},
                    TR:{x:this.props.viewWidth,y:rightPoint.y - padding},
                    BR:{x:this.props.viewWidth,y:this.props.viewHeight},     
                    BL:{x:0,y: this.props.viewHeight}
                  }}
                  unwarped={{
                    TL:{x:0,y:0},
                    TR:{x:this.props.viewWidth,y:0},
                    BR:{x:this.props.viewWidth,y:this.props.viewHeight + padding - orignalHeight},
                    BL:{x:0,y:this.props.viewHeight + padding - orignalHeight},
                  }}
                />
              </div>;
    }
  }
}
export default CanvasItemSplitter;

 