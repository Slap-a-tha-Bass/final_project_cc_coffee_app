import * as express from 'express';
import {get_drinksorder, get_one_drinksorder, post_drinksorder } from '../../db/queries/drinksorder';
import { get_one_order } from '../../db/queries/orders';

const router = express.Router();

router.post('/', async (req, res) => {
    const { order_id } = req.body;
    try {
        await get_one_order(order_id);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
})

export default router;