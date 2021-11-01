import * as express from 'express';
import * as fs from 'fs';
import Stripe from 'stripe';
import { stripeConfig } from '../../config';
import * as moment from 'moment'
import { post_receipt } from '../../db/queries/receipts';
import { StringMappingType } from 'typescript';

const router = express.Router();

const stripe = new Stripe(stripeConfig.secret, { apiVersion: '2020-08-27' });

router.post('/', async (req, res) => {
    const { paymentMethod, amount } = req.body;
    try {
        const paymentFulfilled = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: Math.floor(amount * 100),
            confirm: true,
            payment_method: paymentMethod.id
        });
        const receiptURL: string = encodeURI(paymentFulfilled.charges.data[0].receipt_url);
        const receiptDate = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
        console.log({receiptDate, receiptURL});
        res.json({ receiptURL });
        console.log({ amount, paymentMethod });
    } catch (error) {
        res.status(500).json({ message: "Error posting payment", error });
        console.log({ error, message: "Caught in payment catch block" });
    }
})

export default router;