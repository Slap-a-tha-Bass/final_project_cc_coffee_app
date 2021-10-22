import React, { useState } from 'react';
import { PaymentProps } from '../../../types';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiService } from '../utils/api-service';
import Swal from 'sweetalert2';

const Payment = () => {
    const [fullName, setFullName] = useState<PaymentProps['fullName']>('');
    const [amount, setAmount] = useState<PaymentProps['amount']>();
    const [tip, setTip] = useState<PaymentProps['tip']>();
    const [subtotal, setSubtotal] = useState<PaymentProps['subtotal']>();

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
                const received = await apiService('/api/payment', 'POST', { amount: subtotal + tip, paymentMethod });
                console.log(received, cardData);
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
    }

    return (
        <div>
            <h1 className="text-light mt-3 text-center display-4"><i className="bi bi-cup-fill"></i> payment </h1>
            <form className="form-group bg-info p-2">
                <label className="text-light mt-2 h3" >Full Name</label>
                <input
                    placeholder='Name as it appears on card'
                    value={fullName || ''}
                    onChange={e => setFullName(e.target.value)}
                    type="text"
                    className="form-control" />
                <label className="text-light mt-2 h3" >Subtotal</label>
                <input 
                    value={Number(subtotal) || 0}
                    onChange={e => setSubtotal(Number(e.target.value))}
                    type="number"
                    className="form-control" />
                <label className="text-light mt-2 h3" >Tip</label>
                <input
                    value={Number(tip) || 0}
                    onChange={e => setTip(Number(e.target.value))}
                    type="number"
                    className="form-control" />
                <label className="text-light mt-2 h3" >Total</label>
                <input
                    value={Number(subtotal + tip) || 0 }
                    onChange={e => setAmount(Number(subtotal + tip))}
                    type="number"
                    className="form-control" />
                <label>Credit Card Information</label>
                <CardElement className="form-control" />
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmitPayment} className="btn btn-info rounded-pill btn-lg"><i className="bi bi-arrow-right-circle-fill"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Payment;
