import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Drinks, Orders, Snacks } from '../../../types';
import { apiService } from '../utils/api-service';

const OrderCard = ({ id, first_name, drink_id, snack_id, price, isPreview, in_progress, is_finished }: Orders) => {
    const history = useHistory();
    const [drink_name, setDrink_name] = useState<Drinks['name']>('');
    const [snack_name, setSnack_name] = useState<Snacks['name']>('');

    useEffect(() => {
        apiService(`/api/drinks/${drink_id || ''}`)
            .then(data => setDrink_name(data.name));
    }, [drink_id]);
    useEffect(() => {
        apiService(`/api/snacks/${snack_id || ''}`)
            .then(data => setSnack_name(data.name));
    }, [snack_id]);
    const handleViewOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: `${first_name}'s order received!`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
        history.push(`/orders/${id}`);
    }
    const handleOrderComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: `${first_name}'s order completed!`,
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
        });
        history.push(`/orders/${id}`);
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
                {isPreview && <Link className="btn btn-primary btn-sm text-info border border-light d-flex align-items-center" to={`/edit/${id}`}>edit</Link>}
                {isPreview && <button className="btn btn-primary btn-sm text-info border border-light d-flex align-items-center">delete</button>}
                {is_finished && <button className="btn btn-info btn-lg" onClick={handleOrderComplete}><i className="bi bi-arrow-right-circle-fill"></i></button>}
            </div>
            <div className="d-flex justify-content-end">
                {in_progress && <button className="btn btn-info btn-lg" onClick={handleViewOrder}><i className="bi bi-arrow-right-circle-fill"></i></button>}
            </div>
        </div>
    )
}

export default OrderCard;
