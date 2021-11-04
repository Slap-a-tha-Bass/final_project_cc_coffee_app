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
    const [dr_quantity, setDrQuantity] = useState(0);
    const [sn_quantity, setSnQuantity] = useState(0);

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
    
    const clearDrinks = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedDrinks([]);
    }
    const clearSnacks = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedSnacks([]);
    }
    let disabledBtn = false;
    if (!values.first_name || !selectedDrinks || !selectedSnacks || selectedSnacks.length === 0 || selectedSnacks.length === 0 || drink_ids.length === 0 || snack_ids.length === 0) {
        disabledBtn = true;
    }

    const handlePlusDrink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDrQuantity(dr_quantity + 1);
    }
    const handleMinusDrink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDrQuantity(dr_quantity - 1);
    }
    const handlePlusSnack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSnQuantity(sn_quantity + 1);
    }
    const handleMinusSnack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSnQuantity(sn_quantity - 1);
    }
    console.log(dr_quantity)
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
                {/* select for drinks */}
                <label htmlFor="email" className=" mt-2 h3"><i className="bi bi-cup-fill"></i></label>
                <div className="d-flex justify-content-between">
                    <select className="form-select" name="drink_ids" value={drinkValue} onChange={handleAddDrink}>
                        <option value="0">add drink?</option>
                        {drinks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                    <div className="d-flex align-items-center">
                        <div className="text-success mx-2">{dr_quantity}</div>
                    </div>
                    <button onClick={handlePlusDrink} className="btn btn-light"><i className="bi bi-plus-circle-fill"></i></button>
                    <button onClick={handleMinusDrink} className="btn btn-light"><i className="bi bi-dash-circle-fill"></i></button>
                </div>
                {/* button to clear drinks */}
                <div className="d-flex justify-content-end">
                    <button onClick={clearDrinks} className="btn btn-outline-light btn-sm text-danger">clear drinks</button>
                </div>
                <ul className="list-group list-group-flush">
                    {selectedDrinks.map((drink, index) => {
                        return <li key={`drink-item-${index}`} className="list-group-item border border-light rounded bg-light  d-md-inline">{drink.name} ${drink.price}</li>
                    })}
                </ul>
                {/* select for snacks */}
                <label htmlFor="password" className=" mt-2 h3"><i className="bi bi-palette-fill"></i></label>
                <div className="d-flex justify-content-between">
                    <select className="form-select" name="snack_ids" value={snackValue} onChange={handleAddSnack}>
                        <option value="0" >add snack?</option>
                        {snacks.map((values) => (
                            <option value={values.id} key={values.id}>
                                {values.name}  ${values.price}
                            </option>
                        ))}
                    </select>
                    <div className="d-flex align-items-center">
                        <div className="text-success mx-2">{sn_quantity}</div>
                    </div>
                    <button onClick={handlePlusSnack} className="btn btn-light"><i className="bi bi-plus-circle-fill"></i></button>
                    <button onClick={handleMinusSnack} className="btn btn-light"><i className="bi bi-dash-circle-fill"></i></button>
                </div>
                {/* button to clear snacks */}
                <div className="d-flex justify-content-end">
                    <button onClick={clearSnacks} className="btn btn-outline-light btn-sm text-danger">clear snacks</button>
                </div>
                <ul className="list-group list-group-flush">
                    {selectedSnacks.map((snack, index) => {
                        return <li key={`snack-item-${index}`} className="list-group-item border border-light rounded bg-light ">{snack.name} ${snack.price}</li>
                    })}
                </ul>
                {/* button to submit order */}
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-light btn-lg rounded-pill"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form >
        </>
    )
}

export default PlaceOrder;
