import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Drinks, Orders, Snacks } from '../../../types';
import OrderCard from '../components/OrderCard';
import { apiService } from '../utils/api-service';

const ViewOrder = () => {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<Orders>();

    useEffect(() => {
        apiService(`/api/orders/${id}`)
            .then(data => {
                console.log(data)
                setOrders(data)});
    }, [id]);
    

    return (
        <div>
            <OrderCard {...orders} key={id} isPreview is_finished />
        </div>
    )
}

export default ViewOrder;
