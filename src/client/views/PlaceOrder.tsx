import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { Drinks, Snacks } from '../../../types';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const PlaceOrder = () => {
    const history = useHistory();
    const { values, handleChanges } = useForm();
    const [drinks, setDrinks] = useState<Drinks[]>([]);
    const [snacks, setSnacks] = useState<Snacks[]>([]);

    useEffect(() => {
        apiService('/api/drinks')
            .then(values => setDrinks(values));
    }, []);
    useEffect(() => {
        apiService('/api/snacks')
            .then(values => setSnacks(values));
    }, []);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: 'Review Order',
            icon: 'info',
            iconColor: '#4b0492f6',
            text: 'Please check to make sure everything looks good',
            showConfirmButton: true,
            confirmButtonText: 'Looks good!',
            confirmButtonColor: '#4b0492f6',
            showDenyButton: true,
            denyButtonText: 'Lemme double check!',
            denyButtonColor: '#ff0000'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService('/api/orders', 'POST', { first_name: values.first_name, drink_ids: values.drink_ids, snack_ids: values.snack_ids })
                    .then(values => {
                        console.log(values),
                        history.push(`/orders`)
                    });
            } else if (result.isDenied) {
                return;
            }
        })

    }
    let disabledBtn = false;
    if (!values.first_name || !values.drink_id || !values.snack_id) {
        disabledBtn = true;
    }
    const drinkSelect = <select className="form-select" name="drink_ids" value={values.drink_ids || ''} onChange={handleChanges}>
                <option value="0">nothing chosen...</option>
                    {drinks.map((values) => (
                    <option value={values.id} key={values.id}>
                        {values.name}  ${values.price}
                    </option>
                    ))}
            </select>
    const handleDrinkInput = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        
    }
    return (
        <>
            <h1 className="text-light text-center display-4 mt-3"><i className="bi bi-cup-fill"></i> c^2 coffee </h1>
            <form className="form-group bg-info border rounded p-2">
                <label htmlFor="first_name" className="text-light mt-2 h3"><i className="bi bi-braces"></i></label>
                <div className="d-flex justify-content-between">
                    <input
                        name="first_name"
                        placeholder="Name"
                        value={values.first_name || ''}
                        onChange={handleChanges}
                        type="text"
                        className="form-control" />
                </div>
                <label htmlFor="email" className="text-light mt-2 h3"><i className="bi bi-cup-fill"></i></label>
                <div className="d-flex justify-content-between">
                    {drinkSelect}
                    <button onClick={handleDrinkInput} className="btn btn-info"><i className="bi bi-plus-circle-fill"></i></button>
                </div>
                <label htmlFor="password" className="text-light mt-2 h3"><i className="bi bi-palette-fill"></i></label>
                <div className="d-flex justify-content-between">
                    <select className="form-select" name="snack_ids" value={values.snack_ids || ''} onChange={handleChanges}>
                        <option value="0" className="text-muted">nothing chosen...</option>
                        {snacks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-info btn-lg rounded-pill"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form >
        </>
    )
}

export default PlaceOrder;
