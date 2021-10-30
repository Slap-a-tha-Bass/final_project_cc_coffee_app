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
            iconColor: '#000000',
            text: 'Your card will be charged the full amount',
            showConfirmButton: true,
            confirmButtonColor: '#000000',
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
                        iconColor: '#000000',
                        html: `<a target="_blank" href=${received.receiptURL}>view receipt</a>`,
                        confirmButtonText: 'Got it',
                        confirmButtonColor: '000000'
                    }).then(res => {
                        if(res.isConfirmed){
                            
                        }
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
    const tipMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (tip < (Number(values.total) * 0.05)) {
            Swal.fire({
                title: `:'(`,
                text: `C'mon, tip your barista!`,
                showConfirmButton: true,
                confirmButtonColor: '#000000',
                confirmButtonText: 'Right! My bad'
            });
        }
    }

    return (
        <div>
            <h1 className="mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> payment </h1>
            {hasLoaded && <form className="form-group bg-light shadow-lg p-2">
                <label className="mt-2 h3" >full name</label>
                <input
                    name="fullName"
                    value={values.fullName || ''}
                    onChange={handleChanges}
                    type="text"
                    placeholder='name as it appears on card'
                    className="form-control" />
                <label className="mt-2 h3" >subtotal</label>
                <input
                    name="total"
                    value={Number(values.total) || 0}
                    onChange={handleChanges}
                    type="number"
                    className="form-control" />
                <label className="mt-2 h6" >
                    <button onClick={handle18} className="btn btn-light mx-3">tip %18 = ${(Number(values.total) * 0.18).toFixed(2)}</button>
                    <button onClick={handle21} className="btn btn-light mx-3">tip %21 = ${(Number(values.total) * 0.21).toFixed(2)}</button>
                    <button onClick={handle24} className="btn btn-light mx-3">tip %24 = ${(Number(values.total) * 0.24).toFixed(2)}</button>
                </label>
                <input
                    name="tip"
                    value={Number(tip).toFixed(2) || 0}
                    onChange={e => setTip(Number(e.target.value))}
                    type="number"
                    className="form-control" />
                <label className="mt-2 h3" >Total</label>
                <input
                    name="grandtotal"
                    value={grandTotal.toFixed(2)}
                    type="number"
                    readOnly
                    className="form-control" />
                <label className="mt-2 h3">Credit Card Information</label>
                <CardElement className="form-control" />
                <div className="d-flex justify-content-center">
                    <button onMouseOver={tipMouseOver} onClick={handleSubmitPayment} disabled={disabledBtn} className="btn btn-light rounded-pill btn-lg mt-2"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form>}
        </div>
    )
}

export default Payment;
