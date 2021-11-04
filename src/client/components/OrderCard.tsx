import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Drinks, Orders, Snacks } from '../../../types';
import { apiService } from '../utils/api-service';

const OrderCard = ({ id, first_name, drink_id, snack_id, price, isPreview, in_progress, is_finished }: Orders) => {
    const history = useHistory();
    const [drink_name, setDrink_name] = useState<Drinks['name']>('');
    const [snack_name, setSnack_name] = useState<Snacks['name']>('');
    const [total, setTotal] = useState<Orders[]>();
    const [dr_quantity, setDrQuantity] = useState();
    const [sn_quantity, setSnQuantity] = useState();

    useEffect(() => {
        apiService(`/api/orders/${id}/join`)
            .then(order => {
                setDrink_name(order.drinkNames),
                setSnack_name(order.snackNames),
                setDrQuantity(order.quantities.dr_quantity),
                setSnQuantity(order.quantities.sn_quantity),
                setTotal(order.grandTotal),
                console.log(order)
            })
    }, [id]);
    const handleViewOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: `${first_name}'s order received!`,
            icon: 'success',
            iconColor: '#000000',
            timer: 2000,
            showConfirmButton: false
        });
        history.push(`/orders/${id}`);
    }
    const handleOrderComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: `${first_name}'s order ready for payment!`,
            icon: 'success',
            iconColor: '#000000',
            timer: 2000,
            showConfirmButton: false
        });
        history.push(`/orders/${id}/payment`);
    }
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: 'Delete Order?',
            icon: 'warning',
            iconColor: '#000000',
            text: `Are you sure you want to delete ${first_name}'s order?`,
            showConfirmButton: true,
            confirmButtonText: 'Yes, I am sure!',
            confirmButtonColor: '#000000',
            showDenyButton: true,
            denyButtonText: 'Actually, no!',
            denyButtonColor: '#ff0000'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService(`/api/orders/${id}`, 'DELETE', { first_name })
                    .then(() => {
                        Swal.fire({
                            title: 'Order deleted!',
                            icon: 'success',
                            iconColor: '#000000',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        history.push('/orders')});
            } else if (result.isDenied) {
                return;
            }
        })
    }

    return (
        <div className="card bg-light bg-gradient p-2 border rounded shadow-lg my-2">
            <h1 className="card-title text-center border-3 border-bottom border-dark mb-2"><i className="bi bi-braces"></i>  {first_name}</h1>
            <div className="card-body">
                <h3 className="card-text text-center mt-3"><i className="bi bi-cup-fill"></i> {drink_name.split('&').join(' & ')}</h3>
                <h3 className="card-text text-center mt-3"><i className="bi bi-palette-fill"></i>  {snack_name.split('&').join(' & ')}</h3>
                <h5 className="card-text text-center mt-3 h2">${total}</h5>
            </div>
            <div className="d-flex justify-content-around">
                {isPreview && <Link className="btn btn-light btn-lg rounded-pill" to={`/edit/${id}`}><i className="bi bi-pencil-fill"></i></Link>}
                {isPreview && <button onClick={handleDelete} className="btn btn-light btn-lg rounded-pill"><i className="bi bi-x-circle-fill"></i></button>}
                {is_finished && <button className="btn btn-light btn-lg rounded-pill" onClick={handleOrderComplete}><i className="bi bi-arrow-right-circle-fill"></i></button>}
            </div>
            <div className="d-flex justify-content-end">
                {in_progress && <button className="btn btn-light rounded-pill btn-lg mx-3" onClick={handleViewOrder}><i className="bi bi-arrow-right-circle-fill"></i></button>}
            </div>
        </div>
    )
}

export default OrderCard;
