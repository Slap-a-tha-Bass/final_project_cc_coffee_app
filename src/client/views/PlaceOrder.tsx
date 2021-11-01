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
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const [drinkValue, setDrinkValue] = useState(0);
    const [selectedSnacks, setSelectedSnacks] = useState([]);
    const [snackValue, setSnackValue] = useState(0);

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
            iconColor: '#000000',
            text: 'Please check to make sure everything looks good',
            showConfirmButton: true,
            confirmButtonText: 'Looks good!',
            confirmButtonColor: '#000000',
            showDenyButton: true,
            denyButtonText: 'Lemme double check!',
            denyButtonColor: '#ff0000'
        }).then((result) => {
            if (result.isConfirmed) {
                apiService('/api/orders', 'POST', { first_name: values.first_name, drink_ids: drink_ids, snack_ids: snack_ids })
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
    if (!values.first_name || !selectedDrinks || !selectedSnacks) {
        disabledBtn = true;
    }
    const handleAddDrink = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [filteredDrinkId] = drinks.filter(fd => fd.id === Number(e.target.value));
        setSelectedDrinks([...selectedDrinks, filteredDrinkId]);
        setDrinkValue(0);
    }
    const handleAddSnack = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [filteredSnackId] = snacks.filter(fs => fs.id === Number(e.target.value));
        setSelectedSnacks([...selectedSnacks, filteredSnackId]);
        setSnackValue(0);
    }
    const drink_ids = selectedDrinks.map(drink => drink.id);
    const snack_ids = selectedSnacks.map(snack => snack.id);

    // console.log({selectedDrinks, drink_ids, snack_ids});
    return (
        <>
            <h1 className="text-center display-4 mt-3"><i className="bi bi-cup-fill"></i> c^2 coffee </h1>
            <form className="form-group bg-light bg-gradient border rounded p-2">
                <label htmlFor="first_name" className=" mt-2 h3"><i className="bi bi-braces"></i></label>
                <div className="d-flex justify-content-between">
                    <input
                        name="first_name"
                        placeholder="Name"
                        value={values.first_name || ''}
                        onChange={handleChanges}
                        type="text"
                        className="form-control" />
                </div>
                <label htmlFor="email" className=" mt-2 h3"><i className="bi bi-cup-fill"></i></label>
                <div className="d-flex justify-content-between">
                    <select className="form-select" name="drink_ids" value={drinkValue} onChange={handleAddDrink}>
                        <option value="0">add drink</option>
                        {drinks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                </div>
                <ul className="list-group list-group-flush">
                    {selectedDrinks.map((drink, index) => {
                        return <li key={`drink-item-${index}`} className="list-group-item border border-light rounded bg-light  d-md-inline">{drink.name} ${drink.price}</li>
                    })}
                </ul>
                <label htmlFor="password" className=" mt-2 h3"><i className="bi bi-palette-fill"></i></label>
                <div className="d-flex justify-content-between">
                    <select className="form-select" name="snack_ids" value={snackValue} onChange={handleAddSnack}>
                        <option value="0" >add snack</option>
                        {snacks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                </div>
                <ul className="list-group list-group-flush">
                    {selectedSnacks.map((snack, index) => {
                        return <li key={`snack-item-${index}`} className="list-group-item border border-light rounded bg-light ">{snack.name} ${snack.price}</li>
                    })}
                </ul>
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-light btn-lg rounded-pill"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form >
        </>
    )
}

export default PlaceOrder;
