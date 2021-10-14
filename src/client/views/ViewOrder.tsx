import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Drinks, Orders, Snacks } from '../../../types';
import OrderCard from '../components/OrderCard';
import { apiService } from '../utils/api-service';

const ViewOrder = () => {
    const { id } = useParams<{ id: string }>();
    const [orders, setOrders] = useState<Orders>();
    const [drink_id, setDrink_id] = useState<Orders['drink_id']>();
    const [snack_id, setSnack_id] = useState<Orders['snack_id']>();
    useEffect(() => {
        apiService(`/api/orders/${id}`)
            .then(data => {
                setOrders(data)});
    }, [id]);
    

    return (
        <div>
            <OrderCard {...orders} key={id} isPreview />
        </div>
    )
}

export default ViewOrder;
