import * as express from 'express';
import * as passport from 'passport';
import { get_orders, 
        get_one_order, 
        post_order, 
        edit_order, 
        delete_order } from '../../db/queries/orders';
import { v4 as uuid_v4 } from 'uuid';

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
    const { first_name, price, drink_id, snack_id, in_progress, is_finished } = req.body;
    try {
        const id = uuid_v4();
        const newOrder = { id, first_name, price, drink_id, snack_id, in_progress, is_finished };
        await post_order(newOrder, id);
        res.json({ message: "Order created!", id});
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    const { first_name, price, drink_id, snack_id, in_progress, is_finished } = req.body;
    const editOrder = { first_name, price, drink_id, snack_id, in_progress, is_finished };
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