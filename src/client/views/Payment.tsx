import React, { useEffect, useState } from 'react';
import { PaymentProps } from '../../../types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiService } from '../utils/api-service';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { useParams } from 'react-router';

const Payment = () => {
    const { id } = useParams<{ id: string }>();
    const { values, handleChanges, populate } = useForm();
    const [fullName, setFullName] = useState<PaymentProps['fullName']>('');
    const [amount, setAmount] = useState<PaymentProps['amount']>();
    const [tip, setTip] = useState<PaymentProps['tip']>();
    const [subtotal, setSubtotal] = useState<PaymentProps['subtotal']>();
    const [hasLoaded, setHasLoaded] = useState(false);


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardData = elements.getElement(CardElement);
        
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
        }).then(async(results) => {
            if (error) {
                console.log(error);
                return;
            } else if (results.isConfirmed) {
                const received = await apiService('/api/payment', 'POST', { amount: Number(values.subtotal) || Number(values.price) + Number(values.tip), paymentMethod });
                console.log(received);
            } else if (results.isDenied){
                return;
            }
        })
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardData,
            billing_details: {
                name: fullName
            }
        });
        console.log(paymentMethod)
    }
    let disabledBtn = false;
    if(!fullName || !values.tip){
        disabledBtn = true;
    }
    useEffect(() => {
        apiService(`/api/orders/${id}`)
            .then(values => {
                populate(values),
                setHasLoaded(true)
            });
    }, [id]);
    return (
        <div>
            <h1 className="text-light mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> payment </h1>
            <form className="form-group bg-info p-2">
                <label className="text-light mt-2 h3" >Full Name</label>
                <input
                    name="fullName"
                    value={fullName || ''}
                    onChange={e => setFullName(e.target.value)}
                    type="text"
                    placeholder= 'Name as it appears on card'
                    className="form-control" />
                <label className="text-light mt-2 h3" >Subtotal</label>
                <input 
                    name="subtotal"
                    value={Number(values.price) || Number(values.subtotal) || 0}
                    onChange={handleChanges}
                    type="number"
                    className="form-control" />
                {hasLoaded && <label className="text-light mt-2 h6" >
                    Tip %15 = ${(Number(values.price) * 0.15).toFixed(2)}
                    <p></p>Tip %20 = ${(Number(values.price) * 0.20).toFixed(2)}
                    <p></p>Tip %25 = ${(Number(values.price) * 0.25).toFixed(2)}
                </label>}
                <input
                    name="tip"
                    value={Number(values.tip) || 0}
                    onChange={handleChanges}
                    type="number"
                    className="form-control" />
                <label className="text-light mt-2 h3" >Total</label>
                <input
                    name="amount"
                    value={Number(values.subtotal || Number(values.price)  + Number(values.tip)) || 0 }
                    onChange={handleChanges}
                    type="number"
                    className="form-control" />
                <label>Credit Card Information</label>
                <CardElement className="form-control" />
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmitPayment} disabled={disabledBtn} className="btn btn-info rounded-pill btn-lg"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Payment;
