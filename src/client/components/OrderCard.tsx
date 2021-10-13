import React from 'react';
import { Orders } from '../../../types';

const OrderCard = ({ first_name, drink_id, snack_id, price, isPreview, in_progress, is_finished}: Orders) => {
    return (
        <div className="card">
            <h1 className="card-title">{first_name}</h1>
            <div className="card-body">
                <h3 className="card-text">{drink_id}</h3>
                <h3 className="card-text">{snack_id}</h3>
                <h5 className="card-text">{price}</h5>
            </div>
        </div>
    )
}

export default OrderCard;
