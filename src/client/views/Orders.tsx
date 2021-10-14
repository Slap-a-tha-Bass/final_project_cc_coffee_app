import React, { useEffect, useState } from 'react';
import { Orders } from '../../../types';
import OrderCard from '../components/OrderCard';
import { apiService } from '../utils/api-service';

const Orders = () => {
    const [orders, setOrders] = useState<Orders[]>([]);
    useEffect(() => {
        apiService('/api/orders')
            .then(data => setOrders(data));
    }, []);

    return (
        <div>
            {orders.map((order) => (
                <OrderCard key={order.id} {...order} in_progress />
            ))}
        </div>
    )
}

export default Orders;
