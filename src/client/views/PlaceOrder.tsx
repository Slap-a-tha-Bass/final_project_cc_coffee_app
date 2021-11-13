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
    const [selectedSnacks, setSelectedSnacks] = useState([]);
    const [selectedDrinkQuantity, setSelectedDrinkQuantity] = useState([]);
    const [selectedSnackQuantity, setSelectedSnackQuantity] = useState([]);

    const [drinkValue, setDrinkValue] = useState(0);
    const [snackValue, setSnackValue] = useState(0);
    const [dr_quantity, setDrQuantity] = useState(1);
    const [sn_quantity, setSnQuantity] = useState(1);

    const [hasSelectedDrink, setHasSelectedDrink] = useState(false);
    const [hasSelectedSnack, setHasSelectedSnack] = useState(false);
    const [waitForQuantity, setWaitForQuantity] = useState(true);

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
        if (selectedDrinks.length !== selectedDrinkQuantity.length) {
            Swal.fire({
                title: 'Oops!',
                icon: 'error',
                text: 'Make sure quantities match products chosen',
                showConfirmButton: true,
                confirmButtonText: 'Got it!'
            }).then(res => {
                return;
            })
        }
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
                apiService('/api/orders', 'POST', { first_name: values.first_name, drinks: drinkObject, snacks: snackObject })
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
        const newDrinksArray = drinks.filter(fd => fd.id !== Number(e.target.value));
        setDrinks(newDrinksArray);
        setSelectedDrinks([...selectedDrinks, filteredDrinkId]);
        setDrinkValue(0);
        setHasSelectedDrink(true);
        setWaitForQuantity(false);
        console.log({ selectedDrinks, filteredDrinkId });
    }
    const handleAddSnack = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [filteredSnackId] = snacks.filter(fs => fs.id === Number(e.target.value));
        const newSnacksArray = snacks.filter(fd => fd.id !== Number(e.target.value));
        setDrinks(newSnacksArray);
        setSelectedSnacks([...selectedSnacks, filteredSnackId]);
        setSnackValue(0);
        setHasSelectedSnack(true);
        setWaitForQuantity(false);
        console.log({ selectedSnacks, sn_quantity })
    }
    const drink_ids = selectedDrinks.map(drink => drink.id);
    const snack_ids = selectedSnacks.map(snack => snack.id);

    const drinkObject = selectedDrinks.map((drink, index) => {
        return {
            drink_id: drink.id,
            dr_quantity: selectedDrinkQuantity[index]
        }
    });
    const snackObject = selectedSnacks.map((snack, index) => {
        return {
            snack_id: snack.id,
            sn_quantity: selectedSnackQuantity[index]
        }
    });
    console.log({drinkObject, snackObject})
    const clearDrinks = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedDrinks([]);
        setSelectedDrinkQuantity([]);
        setDrQuantity(1);
        setHasSelectedDrink(false);
        setWaitForQuantity(true);
        apiService('/api/drinks')
            .then(data => setDrinks(data));
    }
    const clearSnacks = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedSnacks([]);
        setSelectedSnackQuantity([]);
        setSnQuantity(1);
        setHasSelectedDrink(false);
        setWaitForQuantity(true);
        apiService('/api/snacks')
            .then(data => setSnacks(data));
    }
    const confirmDrQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedDrinkQuantity([...selectedDrinkQuantity, dr_quantity]);
        setDrQuantity(1);
        setHasSelectedDrink(false);
        setWaitForQuantity(true);
        console.log({ selectedDrinkQuantity })
    }
    const confirmSnQuantity = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedSnackQuantity([...selectedSnackQuantity, sn_quantity]);
        setSnQuantity(1);
        setHasSelectedSnack(false);
        setWaitForQuantity(true);
        console.log({ selectedSnackQuantity })
    }
    let disabledBtn = false;
    if (!values.first_name || !selectedDrinks || !selectedSnacks || selectedSnacks.length === 0 || selectedSnacks.length === 0 || drink_ids.length === 0 || snack_ids.length === 0 
        || selectedDrinkQuantity.length === 0 || selectedSnackQuantity.length === 0) {
        disabledBtn = true;
    }
 

    const handlePlusDrink = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDrQuantity(dr_quantity + 1)
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
                    {waitForQuantity && <select className="form-select" name="drink_ids" value={drinkValue} onChange={handleAddDrink}>
                        <option value="0">add drink?</option>
                        {drinks.map((drink) => (
                            <option value={drink.id} key={drink.id}>
                                {drink.name}  ${drink.price}
                            </option>
                        ))}
                    </select>}
                </div>
                {/* button to clear drinks */}
                <div className="d-flex justify-content-end">
                    <button onClick={clearDrinks} className="btn btn-outline-light btn-sm text-danger mt-1">clear drinks</button>
                </div>
                {/* buttons to add or subtract quantities */}
                {hasSelectedDrink && <div className="d-flex justify-content-center align-items-center">
                    <div className="mx-4 text-muted">{dr_quantity}</div>
                    <div className="mx-4">
                        <button onClick={handlePlusDrink} className="btn btn-muted bg-light text-muted border border-light"><i className="bi bi-plus-circle-fill"></i></button>
                        <button onClick={handleMinusDrink} className="btn btn-muted bg-light text-muted border border-light"><i className="bi bi-dash-circle-fill"></i></button>
                    </div>
                    <div className="d-flex align-items-center mx-4">
                        <button onClick={confirmDrQuantity} className="btn btn-outline-muted"><i className="bi bi-check-lg"></i></button>
                    </div>
                </div>}
                <ul className="list-group list-group-flush">
                    {selectedDrinks.map((drink, index) => {
                        return (
                            <div key={`drink-item-${index}`} >
                                <div className="d-flex justify-content-between">
                                    <li className="list-group-item border border-light rounded bg-light">{`${drink.name}`}
                                    </li>
                                </div>
                            </div>
                        )
                    })}
                </ul>
                {selectedDrinkQuantity.map((quantity, index) => (
                    <div key={`quantity-${index}`} className="d-inline-block mx-3 text-muted">{quantity}</div>
                ))}
                {/* select for snacks */}
                <div>
                    <label htmlFor="password" className=" mt-2 h3"><i className="bi bi-palette-fill"></i></label>
                </div>
                <div className="d-flex justify-content-between">
                    {waitForQuantity && <select className="form-select" name="snack_ids" value={snackValue} onChange={handleAddSnack}>
                        <option value="0" >add snack?</option>
                        {snacks.map((snack) => (
                            <option value={snack.id} key={snack.id}>
                                {snack.name}  ${snack.price}
                            </option>
                        ))}
                    </select>}
                </div>
                {/* button to clear snacks */}
                <div className="d-flex justify-content-end">
                    <button onClick={clearSnacks} className="btn btn-outline-light btn-sm text-danger mt-1">clear snacks</button>
                </div>
                {/* buttons to add or subtract quantities */}
                {hasSelectedSnack && <div className="d-flex justify-content-center align-items-center">
                    <div className="mx-4 text-muted">{sn_quantity}</div>
                    <div className="mx-4">
                        <button onClick={handlePlusSnack} className="btn btn-muted bg-light text-muted border border-light"><i className="bi bi-plus-circle-fill"></i></button>
                        <button onClick={handleMinusSnack} className="btn btn-muted bg-light text-muted border border-light"><i className="bi bi-dash-circle-fill"></i></button>
                    </div>
                    <div className="d-flex align-items-center mx-4">
                        <button onClick={confirmSnQuantity} className="btn btn-outline-muted"><i className="bi bi-check-lg"></i></button>
                    </div>
                </div>}
                <ul className="list-group list-group-flush">
                    {selectedSnacks.map((snack, index) => {
                        return (
                            <div key={`snack-item-${index}`} >
                                <div className="d-flex justify-content-between">
                                    <li className="list-group-item border border-light rounded bg-light">{`${snack.name}`}</li>
                                </div>
                            </div>
                        )
                    })}
                </ul>
                {selectedSnackQuantity.map((quantity, index) => (
                    <div key={`quantity-${index}`} className="d-inline-block mx-3 text-muted">{quantity}</div>
                ))}
                {/* button to submit order */}
                <div className="d-flex justify-content-center mt-2">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-light btn-lg rounded-pill"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form >
        </>
    )
}

export default PlaceOrder;
