const colorArray = ['#1f78b4', '#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6',
  '#6a3d9a','#ffff99', '#a6cee3'];
const otherColor = '#b15928';
export default function getColor(id) {
  return id >= colorArray.length ?
    otherColor :
    colorArray[id];
}