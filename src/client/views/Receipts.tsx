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
            <h3 className="text-success text-center">receipts</h3>
            <div>
                {receipts.map(receipt => (
                    <ReceiptCard key={`receipt-item-${receipt.id}`} {...receipt} />
                ))}
            </div>

        </>
    )
}

export default Receipts;
