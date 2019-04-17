import React from 'react'
import {Card} from 'react-bootstrap';
import CurrencyFormat from 'react-number-format';
import getColor from './userColor';

export default function DivvyItem(props) {
  const {
    onItemClick,
    item,
    user,
  } = props;
  let userItem = false;
  const splitForItem = item.amount === undefined || item.amount === null || item.amount.length === 0 ?
    <CurrencyFormat
      style={{
        flex: 1,
        height: '2rem',
        textAlign: 'right',
      }}
      value={item.price}
      displayType={'text'}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator={true}
      prefix={'$'}/> :
    item.amount.map(function(portion, i) {
      const color = getColor(portion.user_id);
      userItem = userItem || portion.user_id === user.user_id;
      return(
        <div key={i} className="divvy-item-split" style={{
          backgroundColor: color,
          flex: portion.amount,
          order: portion.user_id === user.user_id ? '100' : 'auto',
          height: '2rem',
        }}>
          {portion.user_id === user.user_id || item.amount.length -1 === i && !userItem ?
            <span className="divvy-item-price">
              <CurrencyFormat
                value={item.price}
                displayType={'text'}
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator={true}
                prefix={'$'}/>
            </span> : <></>
          }
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
