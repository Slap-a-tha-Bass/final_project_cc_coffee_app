import React, { useEffect, useState } from 'react';
import { Receipts } from '../../../types';
import ReceiptCard from '../components/ReceiptCard';
import { apiService } from '../utils/api-service';

const Receipts = () => {
    const [receipts, setReceipts] = useState<Receipts[]>([]);
    useEffect(() => {
        apiService('/api/receipts')
            .then(data => setReceipts(data));
    }, [])
    return (
        <>
            <div>
                {receipts.map(receipt => (
                    <ReceiptCard key={receipt.id} {...receipt} />
                ))}
            </div>

        </>
    )
}

export default Receipts;
