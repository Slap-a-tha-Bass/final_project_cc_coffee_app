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
        apiService(`/api/drinks/${drink_id}`)
            .then(data => setDrink_name(data.name));
    }, [drink_id]);
    useEffect(() => {
        apiService(`/api/snacks/${snack_id}`)
            .then(data => setSnack_name(data.name));
    }, [snack_id]);
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        Swal.fire({
            title: `${first_name}'s order received!`,
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
            <div className="d-flex justify-content-between">
                {isPreview && <Link className="btn btn-primary text-info font-weight-bolder border border-light" to={`/edit/${id}`}>edit order</Link>}
                {isPreview && <button className="btn btn-primary text-info font-weight-bolder border border-light">delete order</button>}
            </div>
            <div className="d-flex justify-content-end">
                {in_progress && <div className="form-check form-switch mx-4"><input onChange={handleToggle} className="form-check-input" type="checkbox" /></div>}
            </div>
        </div>
    )
}

export default OrderCard;
