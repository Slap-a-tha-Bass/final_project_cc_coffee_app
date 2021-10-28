import React, { useEffect, useState } from 'react';
import { PaymentProps } from '../../../types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiService } from '../utils/api-service';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { useHistory, useParams } from 'react-router';

const Payment = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const { values, handleChanges, populate } = useForm();
    const [tip, setTip] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardData = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardData,
            billing_details: {
                name: values.fullName
            }
        });
        console.log(values.total, tip)
        Swal.fire({
            title: 'Are you sure you want to submit payment?',
            icon: 'question',
            iconColor: '#4b0492f6',
            text: 'Your card will be charged the full amount',
            showConfirmButton: true,
            confirmButtonColor: '#4b0492f6',
            confirmButtonText: 'Submit',
            showDenyButton: true,
            denyButtonColor: '#ff0000',
            denyButtonText: 'Cancel'
        }).then(async (results) => {
            if (results.isConfirmed) {
                const received = await apiService('/api/payment', 'POST', { amount: grandTotal, paymentMethod });
                console.log(received),
                    Swal.fire({
                        title: 'Payment accepted!',
                        icon: 'success',
                        iconColor: '#4b0492f6',
                        html: `<a target="_blank" href=${received.receiptURL}>view receipt</a>`
                    })
                history.push('/orders')
            } else if (results.isDenied) {
                return;
            }
        }).catch((error) => {
            console.log(error);
        });
        if (error) { console.log(error) };
        console.log(paymentMethod)
    }
    let disabledBtn = false;
    if (!values.fullName || !tip) {
        disabledBtn = true;
    }
    useEffect(() => {
        apiService(`/api/orders/${id}/join`)
            .then(values => {
                populate(values),
                    setHasLoaded(true)
            });
    }, [id]);
    useEffect(() => {
        setGrandTotal(Number(values.total || 0) + tip)
    }, [values.total, tip]);
    const handle18 = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const tip18 = (Number(values.total) * 0.18);
        setTip(tip18);
    }
    const handle21 = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const tip21 = (Number(values.total) * 0.21);
        setTip(tip21);
    }
    const handle24 = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const tip24 = (Number(values.total) * 0.24);
        setTip(tip24);
    }
    return (
        <div>
            <h1 className="text-light mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> payment </h1>
            {hasLoaded && <form className="form-group bg-info p-2">
                <label className="text-light mt-2 h3" >full name</label>
                <input
                    name="fullName"
                    value={values.fullName || ''}
                    onChange={handleChanges}
                    type="text"
                    placeholder='name as it appears on card'
                    className="form-control" />
                <label className="text-light mt-2 h3" >subtotal</label>
                <input
                    name="total"
                    value={Number(values.total) || 0}
                    onChange={handleChanges}
                    type="number"
                    className="form-control" />
                <label className="text-light mt-2 h6" >
                    <button onClick={handle18} className="btn btn-info mx-3">tip %18 = ${(Number(values.total) * 0.18).toFixed(2)}</button>
                    <button onClick={handle21} className="btn btn-info mx-3">tip %21 = ${(Number(values.total) * 0.21).toFixed(2)}</button>
                    <button onClick={handle24} className="btn btn-info mx-3">tip %24 = ${(Number(values.total) * 0.24).toFixed(2)}</button>
                </label>
                <input
                    name="tip"
                    value={Number(tip) || 0}
                    onChange={e => setTip(Number(e.target.value))}
                    type="number"
                    className="form-control" />
                <label className="text-light mt-2 h3" >Total</label>
                <input
                    name="grandtotal"
                    value={grandTotal}
                    type="number"
                    readOnly
                    className="form-control" />
                <label className="text-light mt-2 h3">Credit Card Information</label>
                <CardElement className="form-control" />
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmitPayment} disabled={disabledBtn} className="btn btn-info rounded-pill btn-lg mt-2"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form>}
        </div>
    )
}

export default Payment;
