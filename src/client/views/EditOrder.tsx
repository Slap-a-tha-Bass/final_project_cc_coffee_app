import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { Drinks, Snacks } from '../../../types';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const EditOrder = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { values, handleChanges, populate } = useForm();
    const [drinks, setDrinks] = useState<Drinks[]>([]);
    const [snacks, setSnacks] = useState<Snacks[]>([]);
    const [newDrinkSelect, setNewDrinkSelect] = useState(false);

    useEffect(() => {
        apiService('/api/drinks')
            .then(values => setDrinks(values));
    }, []);
    useEffect(() => {
        apiService('/api/snacks')
            .then(values => setSnacks(values));
    }, []);
    useEffect(() => {
        apiService(`/api/orders/${id}`)
            .then(values => populate(values));
    }, [id])
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
                apiService(`/api/orders/${id}`, 'PUT', { first_name: values.first_name, drink_id: values.drink_id, snack_id: values.snack_id })
                    .then(() => history.push(`/orders`));
            } else if (result.isDenied) {
                return;
            }
        })

    }
    let disabledBtn = false;
    if (!values.first_name || !values.drink_id || !values.snack_id) {
        disabledBtn = true;
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
                    <select className="form-select" name="drink_id" value={values.drink_id || ''} onChange={handleChanges}>
                        <option value="0">nothing chosen...</option>
                        {drinks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                    {/* <button onClick={handleNewClick} className="btn btn-info"><i className="bi bi-plus-circle"></i></button> */}
                </div>
                <label htmlFor="password" className="text-light mt-2 h3"><i className="bi bi-palette-fill"></i></label>
                <div className="d-flex justify-content-between">
                    <select className="form-select" name="snack_id" value={values.snack_id || ''} onChange={handleChanges}>
                        <option value="0" className="text-muted">nothing chosen...</option>
                        {snacks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                    {/* <button className="btn btn-info"><i className="bi bi-plus-circle"></i></button> */}
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-info btn-lg rounded-pill"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form >
        </>
    )
}

export default EditOrder;
