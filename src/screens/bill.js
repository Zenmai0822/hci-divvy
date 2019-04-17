import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-number-format';

import backendService from '../services/backendService';

class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 'calculating',
    };

    this.updateBill.bind(this);
  }

  componentDidMount() {
    this.service = backendService.getInstance();
    this.service.getBill(this.props.user.user_id, this.props.room.code)
      .then((resp) => { console.log(resp); this.updateBill(resp.bill) });
  }

  updateBill(amount) {
    this.setState({total: amount});
  }

  render() {
    let amountOwed = this.state.total === 'calculating'
      ? <p>Calculating your bill...</p>
      : <div>
        <div>
          <CurrencyFormat
          value={this.state.total}
          displayType={'text'}
          decimalScale={2}
          fixedDecimalScale={true}
          thousandSeparator={true}
          prefix={'$'}/>
        </div>
          <Link to='/finish'><Button variant="success">Pay With Benmo</Button></Link>
        </div>;
    return (
      <div>
        <h1>Amount Owed:</h1>
          <div>
            {amountOwed}
          </div>
      </div>
    );
  }
}
export default Bill;
