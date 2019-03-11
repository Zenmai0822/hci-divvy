import React, { Component } from 'react';

//NOTE: Do not give a image to this component that needs to be scaled.
//Instead scale it convert it to a blob and then use that blob here. 
//Things break and im too lazy to fix them with scaling.
class PerspectiveCrop extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    img: new Image()
	  };

  }
  
  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    this.state.img.onload = () => {
   		
   		canvas.width=this.props.width;
		  canvas.height=this.props.height;
		  // draw the example image on the source canvas
		  ctx.drawImage(this.state.img, 0 , 0);

		  // unwarp the source rectangle and draw it to the destination canvas
		  this.unwarp(this.props.anchors,this.props.unwarped,ctx);
		  canvas.toBlob((blob) => {
		    var linkref = URL.createObjectURL(blob);
		    this.props.imageCallback(blob);
			})
		}
    this.state.img.src = this.props.image;
  }

  render() {
  	return(
      <div>
        <canvas ref="canvas" 
			width={this.props.width} 
			height={this.props.height} 
			onClick={this.props.handleClick}/>
      </div>
    )
  }

	// unwarp the source rectangle
	unwarp(anchors,unwarped,context){

	  // clear the destination canvas
	  context.clearRect(0,0,context.canvas.width,context.canvas.height);

	  // unwarp the bottom-left triangle of the warped polygon
	  this.mapTriangle(context,
	              anchors.TL,  anchors.BR,  anchors.BL,
	              unwarped.TL, unwarped.BR, unwarped.BL
	             );

	  // eliminate slight space between triangles
	  context.translate(-1,1);

	  // unwarp the top-right triangle of the warped polygon
	  this.mapTriangle(context,
	              anchors.TL,  anchors.TR,  anchors.BR,
	              unwarped.TL, unwarped.TR, unwarped.BR
	             );

	}


	// Perspective mapping: Map warped triangle into unwarped triangle
	// Attribution: (SO user: 6502), http://stackoverflow.com/questions/4774172/image-manipulation-and-texture-mapping-using-html5-canvas/4774298#4774298
	mapTriangle(ctx,p0, p1, p2, p_0, p_1, p_2) {

	  // break out the individual triangles x's & y's
	  var x0=p_0.x, y0=p_0.y;
	  var x1=p_1.x, y1=p_1.y;
	  var x2=p_2.x, y2=p_2.y;
	  var u0=p0.x,  v0=p0.y;
	  var u1=p1.x,  v1=p1.y;
	  var u2=p2.x,  v2=p2.y;

	  // save the unclipped & untransformed destination canvas
	  ctx.save();

	  // clip the destination canvas to the unwarped destination triangle
	  ctx.beginPath();
	  ctx.moveTo(x0, y0);
	  ctx.lineTo(x1, y1);
	  ctx.lineTo(x2, y2);
	  ctx.closePath();
	  ctx.clip();

	  // Compute matrix transform
	  var delta   = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
	  var delta_a = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
	  var delta_b = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
	  var delta_c = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2;
	  var delta_d = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
	  var delta_e = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
	  var delta_f = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;

	  // Draw the transformed image
	  ctx.transform(
	    delta_a / delta, delta_d / delta,
	    delta_b / delta, delta_e / delta,
	    delta_c / delta, delta_f / delta
	  );
	  	
	  // draw the transformed source image to the destination canvas
	  ctx.drawImage(this.state.img, 0 , 0);

	  // restore the context to it's unclipped untransformed state
	  ctx.restore();
	}
}
export default PerspectiveCrop;