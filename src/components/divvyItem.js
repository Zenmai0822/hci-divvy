import React from 'react'
import {Card} from 'react-bootstrap';

export default props => {
  const {
    onItemClick,
    item,
  } = props;
  const splitForItem = item.splits.length === 0 ?
    <div style={{
        flex: 1,
        height: '2rem',
      }}>
    </div>
    :
    item.splits.map(function(portion) {
      return(
        <div style={{
          backgroundColor: portion.color,
          flex: portion.size,
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
