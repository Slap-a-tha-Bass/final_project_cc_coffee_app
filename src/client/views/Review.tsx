import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Orders } from '../../../types';
import OrderCard from '../components/OrderCard';
import { apiService } from '../utils/api-service';

const Review = () => {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<Orders>();

    useEffect(() => {
        apiService(`/api/orders/${id}`)
            .then(data => setOrders(data));
    }, [])
    return (
        <div>
            <OrderCard {...orders}/>
        </div>
    )
}

export default Review;
