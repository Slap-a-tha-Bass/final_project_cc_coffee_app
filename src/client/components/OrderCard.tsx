import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Drinks, Orders, Snacks } from '../../../types';
import { apiService } from '../utils/api-service';

const OrderCard = ({ id, first_name, drink_id, snack_id, price, isPreview, in_progress, is_finished }: Orders) => {
    const history = useHistory();
    const [drink_name, setDrink_name] = useState<Drinks['name']>('');
    const [snack_name, setSnack_name] = useState<Snacks['name']>('');
    const order_id = id;
    useEffect(() => {
        apiService(`/api/drinksorder/${order_id}`)
            .then(data => setDrink_name(data.name));
    }, [order_id]);
    useEffect(() => {
        apiService(`/api/snacksorder/${order_id}`)
            .then(data => setSnack_name(data.name));
    }, [order_id]);
    const handleViewOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: `${first_name}'s order received!`,
            icon: 'success',
            iconColor: '#4b0492f6',
            timer: 2000,
            showConfirmButton: false
        });
        history.push(`/orders/${id}`);
    }
    const handleOrderComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: `${first_name}'s order ready for payment!`,
            icon: 'success',
            iconColor: '#4b0492f6',
            timer: 2000,
            showConfirmButton: false
        });
        history.push(`/orders/${id}/payment`);
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: 'Delete Order?',
            icon: 'warning',
            iconColor: '#4b0492f6',
            text: `Are you sure you want to delete ${first_name}'s order?`,
            showConfirmButton: true,
            confirmButtonText: 'Yes, I am sure!',
            confirmButtonColor: '#4b0492f6',
            showDenyButton: true,
            denyButtonText: 'Actually, no!',
            denyButtonColor: '#ff0000'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService(`/api/orders/${id}`, 'DELETE', { first_name, drink_id, snack_id })
                    .then(() => history.push('/orders'));
            } else if (result.isDenied) {
                return;
            }
        })
    }
    return (
        <div className="card bg-info p-2 border rounded shadow my-2">
            <h1 className="card-title text-center text-light border-3 border-bottom border-light mb-2"><i className="bi bi-braces"></i>  {first_name}</h1>
            <div className="card-body">
                <h3 className="card-text text-center text-light"><i className="bi bi-cup-fill"></i>  {drink_name}</h3>
                <h3 className="card-text text-center text-light"><i className="bi bi-palette-fill"></i>  {snack_name}</h3>
                <h5 className="card-text text-center text-light">${price}</h5>
            </div>
            <div className="d-flex justify-content-around">
                {isPreview && <Link className="btn btn-info btn-lg rounded-pill" to={`/edit/${id}`}><i className="bi bi-pencil-fill"></i></Link>}
                {isPreview && <button onClick={handleDelete} className="btn btn-info btn-lg rounded-pill"><i className="bi bi-x-circle-fill"></i></button>}
                {is_finished && <button className="btn btn-info btn-lg rounded-pill" onClick={handleOrderComplete}><i className="bi bi-arrow-right-circle-fill"></i></button>}
            </div>
            <div className="d-flex justify-content-end">
                {in_progress && <button className="btn btn-info rounded-pill btn-lg" onClick={handleViewOrder}><i className="bi bi-arrow-right-circle-fill"></i></button>}
            </div>
        </div>
    )
}

export default OrderCard;
