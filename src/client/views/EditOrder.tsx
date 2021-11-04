import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { Drinks, Orders, Snacks } from '../../../types';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const EditOrder = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { values, handleChanges, populate } = useForm();
    const [drinks, setDrinks] = useState<Drinks[]>([]);
    const [snacks, setSnacks] = useState<Snacks[]>([]);
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const [drinkValue, setDrinkValue] = useState(0);
    const [selectedSnacks, setSelectedSnacks] = useState([]);
    const [snackValue, setSnackValue] = useState(0);
    const [drinkNames, setDrinkNames] = useState([]);
    const [snackNames, setSnackNames] = useState([]);
    const [drinkPrices, setDrinkPrices] = useState([]);
    const [snackPrices, setSnackPrices] = useState([]);
    const [dr_quantity, setDrQuantity] = useState(1);
    const [sn_quantity, setSnQuantity] = useState(1);

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
            .then(values => {
                populate(values)
            });
    }, [id]);
    useEffect(() => {
        apiService(`/api/orders/${id}/join`)
            .then(order => {
                setDrinkNames(order.splitDrinkNames);
                setSnackNames(order.splitSnackNames);
                setDrinkPrices(order.splitDrinkPrices);
                setSnackPrices(order.splitSnackPrices);
            })
    }, [id]);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        Swal.fire({
            title: 'Edit Order',
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
                apiService(`/api/orders/${id}`, 'PUT', { first_name: values.first_name, drink_ids: drink_ids, snack_ids: snack_ids, dr_quantity, sn_quantity })
                    .then(values => {
                        console.log({values}),
                        history.push(`/orders`)
                    });
            } else if (result.isDenied) {
                return;
            }
        })
    }
    let disabledBtn = false;
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
    // console.log({selectedDrinks, drink_ids, snack_ids});
    return (
        <>
            <h1 className="text-center display-4 mt-3"><i className="bi bi-cup-fill"></i> c^2 coffee </h1>
            <form className="form-group bg-light border rounded shadow-lg p-2">
                <label htmlFor="first_name" className="mt-2 h3"><i className="bi bi-braces"></i></label>
                <div className="d-flex justify-content-between">
                    <input
                        name="first_name"
                        value={values.first_name || ''}
                        onChange={handleChanges}
                        type="text"
                        className="form-control" />
                </div>
                <label htmlFor="email" className="mt-2 h3"><i className="bi bi-cup-fill"></i></label>
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
                {/* button to clear drinks */}
                <div className="d-flex justify-content-end">
                    <button onClick={clearDrinks} className="btn btn-outline-light btn-sm text-danger">clear drinks</button>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="d-flex justify-content-center">
                        <div className="d-inline">
                            {drinkNames.map((drinkName, index) => (
                                <li key={`drink-name-${index}`} className="list-group-item border border-light rounded bg-light text-success">{drinkName}</li>
                            ))}
                        </div>
                        <div className="d-inline">
                            {drinkPrices.map((drinkPrice, index) => (
                                <li key={`drink-price-${index}`} className="list-group-item border border-light rounded bg-light text-success"> ${drinkPrice}</li>
                            ))}
                        </div>
                    </div>
                    {selectedDrinks.map((drink, index) => {
                        return (
                            <div key={`drink-item-${index}`} >
                                <div className="d-flex justify-content-between">
                                    <li className="list-group-item border border-light rounded bg-light">{`${drink.name} x${dr_quantity}`} ${drink.price * dr_quantity}</li>
                                    <div className="d-flex">
                                        <button onClick={handlePlusDrink} className="btn btn-light"><i className="bi bi-plus-circle-fill"></i></button>
                                        <button onClick={handleMinusDrink} className="btn btn-light"><i className="bi bi-dash-circle-fill"></i></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ul>
                <label htmlFor="password" className="mt-2 h3"><i className="bi bi-palette-fill"></i></label>
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
                {/* button to clear snacks */}
                <div className="d-flex justify-content-end">
                    <button onClick={clearSnacks} className="btn btn-outline-light btn-sm text-danger">clear snacks</button>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="d-flex justify-content-center">
                        <div className="d-inline">
                            {snackNames.map((snackName, index) => {
                                return <li key={`snack-name-${index}`} className="list-group-item border border-light rounded bg-light text-success">{snackName}</li>
                            })}
                        </div>
                        <div className="d-inline">
                            {snackPrices.map((snackPrice, index) => (
                                <li key={`snack-price-${index}`} className="list-group-item border border-light rounded bg-light text-success"> ${snackPrice}</li>
                            ))}
                        </div>
                    </div>
                    {selectedSnacks.map((snack, index) => {
                        return <li key={`snack-item-${index}`} className="list-group-item border border-light rounded bg-light">{snack.name} ${snack.price}</li>
                    })}
                </ul>
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-light btn-lg rounded-pill"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form >
        </>
    )
}

export default EditOrder;
