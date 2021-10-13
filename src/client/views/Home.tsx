import e from 'express';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Drinks, Snacks } from '../../../types';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const Home = () => {
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
        apiService('/api/orders', 'POST', { first_name: values.first_name, drink_id: values.drink_id, snack_id: values.snack_id })
            .then(data => {
                history.push('/review')});
    }
    return (
        <>
            <h1 className="text-info text-center display-3"><i className="bi bi-cup-fill"></i> c^2 coffee <i className="bi bi-cup-fill"></i></h1>
            <form className="form-group bg-info border rounded p-2">
                <label htmlFor="first_name" className="text-light mt-2 h3"><i className="bi bi-braces"></i></label>
                <input
                    name="first_name"
                    placeholder="Name"
                    value={values.first_name || ''}
                    onChange={handleChanges}
                    type="text"
                    className="form-control" />
                <label htmlFor="email" className="text-light mt-2 h3"><i className="bi bi-cup-fill"></i></label>
                <select className="form-select" name="drink_id" value={values.drink_id || ''} onChange={handleChanges}>
                    <option value="0">nothing chosen...</option>
                    {drinks.map((values) => (
                        <option value={values.id} key={values.id}>
                            {values.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="password" className="text-light mt-2 h3"><i className="bi bi-palette-fill"></i></label>
                <select className="form-select" name="snack_id" value={values.snack_id || ''} onChange={handleChanges}>
                    <option value="0" className="text-muted">nothing chosen...</option>
                    {snacks.map((values) => (
                        <option value={values.id} key={values.id}>
                            {values.name}
                        </option>
                    ))}
                </select>
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} className="btn btn-primary text-info font-weight-bolder border border-light">review order</button>
                </div>
            </form >
        </>
    )
}

export default Home;
