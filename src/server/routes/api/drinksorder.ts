import * as express from 'express';
import {get_drinksorder, get_one_drinksorder, post_drinksorder } from '../../db/queries/drinksorder';
import { get_one_order, post_order } from '../../db/queries/orders';
import { v4 as uuid_v4} from 'uuid';
import { DrinksOrder } from '../../../../types';

const router = express.Router();

router.post('/', async (req, res) => {
    const { first_name, drink_id, price, order_id } = req.body;
    try {
        const id = uuid_v4();
        const newOrder = {id, first_name};
        await get_drinksorder();
        await post_order(newOrder);
        const order_id = newOrder.id;
        
        const drinksOrder = { drink_id, price };
        await post_drinksorder(drinksOrder, order_id);
        res.json({ message: "Order created!", id });
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
})

export default router;