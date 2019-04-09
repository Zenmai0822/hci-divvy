import React, { Component } from 'react';
import PerspectiveCrop from './perspectiveCrop';
import CanvasCropCorners from './canvasCropCorners';

class CanvasImgCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      blob: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.cropCallback = this.cropCallback.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
    this.moveForward = this.moveForward.bind(this);
  }
  componentDidMount() {
    this.props.setTriggers({forward: this.moveForward, back: this.moveBackward});
  }

  moveForward() {
    this.props.moveForward(this.props.file, this.props.viewHeight, this.props.viewWidth);
  }

  moveBackward() {
    if(this.state.points.length === 0) {
      this.props.moveBackward();
    } else {
      const points = [... this.state.points];
      points.splice(points.length -1, 1);
      this.setState({
        points: points
      });
    }
  }

  handleClick(e) {
  e.preventDefault();
  const point = {
                x: e.pageX - e.target.offsetLeft,
                y: e.pageY - e.target.offsetTop,
              };
  const points = [... this.state.points];
  points.push(point);
  this.setState({points: points});
  console.log('The CANVAS was clicked at.');
  console.log(e.nativeEvent.layerX + " " + e.nativeEvent.layerY);
  }
  cropCallback(blob) {
    this.setState({
      blob: URL.createObjectURL(blob)
    });
  }
  minPoints(points, compareX, minTwo) {
    if(points.length === 0) {
      return []
    }
    let minPoint = points[0];
    let minPointIndex = 0;
    for(let i = 1; i < points.length; i++){
      if ((points[i].x < minPoint.x && compareX) || (points[i].y < minPoint.y && !compareX)) {
        minPoint = points[i];
        minPointIndex = i;
      }
    }
    if(minTwo) {
      const newPoints = points.filter((_, i) => minPointIndex !== i);
      let minSecond = newPoints[0];
      for(let i = 1; i < newPoints.length; i++){
        if((newPoints[i].x < minSecond.x && compareX) || (newPoints[i].y < minSecond.y && !compareX)) {
          minSecond = newPoints[i];
        }
      }
      return [minPoint, minSecond];
    }
    return [minPoint];
  }
  maxPoints(points, compareX, maxTwo) {
    if(points.length === 0) {
      return []
    }
    let maxPoint = points[0];
    let maxPointIndex = 0;
    for(let i = 1; i < points.length; i++){
      if((points[i].x > maxPoint.x && compareX) || (points[i].y > maxPoint.y && !compareX)) {
        maxPoint = points[i];
        maxPointIndex = i;
      }
    }
    if(maxTwo) {
      const newPoints = points.filter((_, i) => maxPointIndex !== i);
      let maxSecond = newPoints[0];
      for(let i = 1; i < newPoints.length; i++){
        if((newPoints[i].x > maxSecond.x && compareX) || (newPoints[i].y > maxSecond.y && !compareX)) {
          maxSecond = newPoints[i];
        }
      }
      return [maxPoint, maxSecond];
    }
    return [maxPoint];
  }
  render() {
    if(this.state.points.length < 4 ) {
      return <CanvasCropCorners
              handleClick={this.handleClick} 
              width={this.props.viewWidth}
              height={this.props.viewHeight}
              imageCallback={this.cropCallback}
              image={URL.createObjectURL(this.props.file)}
              points={this.state.points}
             />;
    }
    else{
      const topLeft = this.minPoints(this.minPoints(this.state.points, true, true), false, false)[0];
      const topRight = this.minPoints(this.maxPoints(this.state.points, true, true), false, false)[0];
      const botRight = this.maxPoints(this.maxPoints(this.state.points, true, true), false, false)[0];
      const botLeft = this.maxPoints(this.minPoints(this.state.points, true, true), false, false)[0];
      const originalHeight = Math.min(botRight.y - topRight.y,
                               botLeft.y - topLeft.y);
      const originalWidth = Math.min(topRight.x - topLeft.x,
                               botRight.x - botLeft.x);
      const scaledHeight = (originalHeight * this.props.viewWidth)/originalWidth;
      return <PerspectiveCrop
              handleClick={this.handleClick} 
              image={this.state.blob}
              width={this.props.viewWidth}
              height={scaledHeight}
              imageCallback={(blob) => this.props.imageCallback(blob, scaledHeight, this.props.viewWidth)}
              anchors={{
                TL:topLeft,
                TR:topRight,
                BR:botRight,
                BL:botLeft
              }}
              unwarped={{
                TL:{x:0,y:0},
                TR:{x:this.props.viewWidth, y:0},
                BR:{x:this.props.viewWidth, y:scaledHeight},
                BL:{x:0,y:scaledHeight},
              }}
            />; 
    }
  }
}
export default CanvasImgCropper;

 
