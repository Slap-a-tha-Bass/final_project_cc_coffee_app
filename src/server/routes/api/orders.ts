import * as express from 'express';
import * as passport from 'passport';
import {
    get_orders,
    get_one_order,
    post_order,
    edit_order,
    delete_order,
    get_JOIN_everything_by_ID
} from '../../db/queries/orders';
import { get_one_drink } from '../../db/queries/drinks';


import { v4 as uuid_v4 } from 'uuid';
import { get_one_snack } from '../../db/queries/snacks';
import { post_drinksorder } from '../../db/queries/drinksorder';
import { post_snacksorder } from '../../db/queries/snacksorder';

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
router.get('/:id/join', async (req, res) => {
    const { id } = req.params;
    try {
        const [joinedDataByID] = await get_JOIN_everything_by_ID(id);
        const order = joinedDataByID;
        console.log(order);
        const total = [...order.drink_prices.split('&'), ...order.snack_prices.split('&')].map(price => 
            Number(price)).reduce((a,b) => (a+b)*1.09).toFixed(2);
        const drinkNames = order.drink_names;
        const splitDrinkNames = drinkNames.split('&');
        const snackNames = order.snack_names;
        const splitSnackNames = snackNames.split('&');
        const drinkPrices = order.drink_prices;
        const splitDrinkPrices = drinkPrices.split('&').map(price => Number(price).toFixed(2));
        const snackPrices = order.snack_prices;
        const splitSnackPrices = snackPrices.split('&').map(price => Number(price).toFixed(2));
        res.json({order, total, drinkNames, snackNames, drinkPrices, snackPrices, splitDrinkNames,  splitSnackNames, splitDrinkPrices, splitSnackPrices});
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.post('/', async (req, res) => {
    const { first_name, drink_ids, snack_ids } = req.body;
    try {
        const id = uuid_v4();
        const newOrder = { id, first_name };
        await post_order(newOrder);

        for await (const drink_id of drink_ids) {
            const drinksOrder = { drink_id, order_id: id };
            await post_drinksorder(drinksOrder);
        }
        for await (const snack_id of snack_ids){
            const snacksOrder = { snack_id, order_id: id };
            await post_snacksorder(snacksOrder);
        }
        res.json({ message: "Order created!", id });
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    const { first_name, drink_ids, snack_ids } = req.body;
    try {
        const editOrder = { id, first_name };
        await edit_order(editOrder , id);

        for await (const drink_id of drink_ids) {
            const drinksOrder = { drink_id, order_id: id };
            await post_drinksorder(drinksOrder);
        }
        for await (const snack_id of snack_ids){
            const snacksOrder = { snack_id, order_id: id };
            await post_snacksorder(snacksOrder);
        }
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