import React from 'react';
import { Receipts } from '../../../types';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { apiService } from '../utils/api-service';
import { useHistory } from 'react-router';

const ReceiptCard = ({id, fullName, amount, receiptURL, _created }: Receipts) => {
    const history = useHistory();

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        Swal.fire({
            title: 'Delete Order?',
            icon: 'warning',
            iconColor: '#000000',
            text: `Are you sure you want to delete ${fullName}'s order?`,
            showConfirmButton: true,
            confirmButtonText: 'Yes, I am sure!',
            confirmButtonColor: '#000000',
            showDenyButton: true,
            denyButtonText: 'Actually, no!',
            denyButtonColor: '#ff0000'
        }).then(res => {
            if (res.isConfirmed) {
                apiService(`/api/receipts/${id}`, 'DELETE', { fullName, amount, receiptURL })
                    .then(() => history.push('/receipts'));
            } else if (res.isDenied) {
                return;
            }
        })
    }

    return (

        <div className="card bg-light border rounded shadow-lg m-2">
            <div className="card-header h1">{fullName}</div>
            <div className="card-body">
                <p className="card-text h4">${amount.toFixed(2)}</p>
                <a href={receiptURL} target="_blank" className="card-text text-decoration-none text-success">{receiptURL}</a>
            </div>
            <div className="d-flex justify-content-between">
                <div className="card-footer">{moment(_created).format('MMMM Do YYYY, h:mm:ss a')}</div>
                <button onClick={handleDelete} className="btn btn-light">X</button>
            </div>
        </div>
    )
}

export default ReceiptCard;
