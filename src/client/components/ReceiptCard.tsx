import React from 'react';
import { Receipts } from '../../../types';
import * as moment from 'moment';

const ReceiptCard = ({ fullName, amount, receiptURL, _created }: Receipts) => {
    return (

        <div className="card bg-light border rounded shadow-lg m-2">
            <div className="card-header h1">{fullName}</div>
            <div className="card-body">
                <p className="card-text h4">${amount.toFixed(2)}</p>
                <a href={receiptURL} target="_blank" className="card-text text-decoration-none text-success">{receiptURL}</a>
            </div>
            <div className="card-footer">{moment(_created).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
    )
}

export default ReceiptCard;
