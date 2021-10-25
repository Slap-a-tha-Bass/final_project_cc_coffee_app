import * as express from 'express';
import Stripe from 'stripe';
import { stripeConfig } from '../../config';

const router = express.Router();

const stripe = new Stripe(stripeConfig.secret, {apiVersion: '2020-08-27'});

router.post('/', async(req,res) => {
    const { paymentMethod, amount} = req.body;
    try {
        const paymentFulfilled = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: amount * 100,
            confirm: true,
            payment_method: paymentMethod.id
        });
        const receiptURL = paymentFulfilled.charges.data[0].receipt_url;
        res.json({receiptURL});
    } catch (error) {
        res.status(500).json({ message: "Error posting payment", error: error.sqlMessage});
    }
})

export default router;