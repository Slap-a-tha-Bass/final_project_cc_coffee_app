import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Orders } from '../../../types';
import OrderCard from '../components/OrderCard';
import { apiService } from '../utils/api-service';

const Orders = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        apiService('/api/orders')
            .then(data => {
                setOrders(data),
                setHasLoaded(true)
            });
    }, []);
    
    if (hasLoaded && orders.length === 0) {
        return <div className="h1 display-3 text-center">no current orders...</div>;
    }
    return (
        <div>
            {hasLoaded && <h1 className="mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> orders </h1>}
            {orders.map((order) => (
                <OrderCard key={order.id} {...order} in_progress />
            ))}
        </div>
    )
}

export default Orders;
