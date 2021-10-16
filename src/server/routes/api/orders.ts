import * as express from 'express';
import * as passport from 'passport';
import { get_orders, 
        get_one_order, 
        post_order, 
        edit_order, 
        delete_order } from '../../db/queries/orders';
import { get_one_drink } from '../../db/queries/drinks';


import { v4 as uuid_v4 } from 'uuid';
import { get_one_snack } from '../../db/queries/snacks';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await get_orders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [order] = await get_one_order(id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.post('/', passport.authenticate('jwt'), async (req, res) => {
    const { first_name, drink_id, snack_id } = req.body;
    try {
        const id = uuid_v4();
        const [drink] = await get_one_drink(drink_id);
        const [snack] = await get_one_snack(snack_id);
        const newOrder = { id, first_name, drink_id: drink_id, snack_id: snack_id, price: (drink.price + snack.price) + (0.10*(drink.price + snack.price) + 0.00) };
        await post_order(newOrder);
        res.json({ message: "Order created!", id});
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    const { first_name, drink_id, snack_id } = req.body;
    const editOrder = { first_name, drink_id, snack_id };
    try {
        await edit_order(editOrder, id);
        res.json({ message: "Order editted" })
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.delete('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    try {
        await delete_order(id);
        res.json({ message: "Order deleted!" })
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});

export default router;