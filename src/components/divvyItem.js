import React from 'react'
import {Card} from 'react-bootstrap';

const userColor = '#a6cee3';
const colorArray = ['#1f78b4', '#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6',
  '#6a3d9a','#ffff99'];
const otherColor = '#b15928';

export default function DivvyItem(props) {
  const {
    onItemClick,
    item,
    user,
  } = props;
  const splitForItem = item.amount === undefined || item.amount === null || item.amount.length === 0 ?
    <div style={{
        flex: 1,
        height: '2rem',
      }}>
    </div>
    :
    item.amount.map(function(portion, i) {
      const color = portion.user_id === user.user_id ?
        userColor :
        (portion.user_id >= colorArray.length ?
          otherColor :
          colorArray[portion.user_id]);
      return(
        <div key={i} style={{
          backgroundColor: color,
          flex: portion.amount === -1 ? 1 : portion.amount,
          order: portion.user_id === user.user_id ? '100' : 'auto',
          height: '2rem',
        }}>
        </div>
      )
  });
  return (
    <Card className=" divvy-item" border='dark' onClick={onItemClick}>
      <Card.Img variant="top" src={item.image} />
      <div className='flex-row d-flex'> {splitForItem} </div>
    </Card>
  );
}
