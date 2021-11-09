import * as express from 'express';
import * as passport from 'passport';
import {
    get_orders,
    get_one_order,
    post_order,
    edit_order,
    delete_order,
    get_JOIN_everything_by_ID,
    get_JOIN_quantities
} from '../../db/queries/orders';
import { v4 as uuid_v4 } from 'uuid';
import { get_one_drinksorder, post_drinksorder } from '../../db/queries/drinksorder';
import { get_one_snacksorder, get_snacksorder, post_snacksorder } from '../../db/queries/snacksorder';

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
        const tax= 1.09;
        const [order] = await get_JOIN_everything_by_ID(id);
        const drinks = await get_one_drinksorder(id);
        const snacks = await get_one_snacksorder(id);
        const drink_ids = drinks.map(drink => drink.drink_id);
        const snack_ids = snacks.map(snack => snack.snack_id);
        const drink_quantities = drinks.map(drink => drink.dr_quantity);
        const snack_quantities = snacks.map(snack => snack.sn_quantity);
        console.log({drinks, snacks});
        console.log({order});
        console.log({drink_ids, snack_ids});
        console.log({drink_quantities, snack_quantities});
        const total = [...order.drink_prices.split('&'), ...order.snack_prices.split('&')].map(price => 
            Number(price)).reduce((a,b) => ((a)+(b))*1.09).toFixed(2);
        const drinkNames = order.drink_names;
        const splitDrinkNames = drinkNames.split('&');
        const snackNames = order.snack_names;
        const splitSnackNames = snackNames.split('&');
        const drinkPrices = order.drink_prices;
        const splitDrinkPrices = drinkPrices.split('&').map(price => (Number(price)));
        const snackPrices = order.snack_prices;
        const splitSnackPrices = snackPrices.split('&').map(price => (Number(price)));
            console.log({splitDrinkPrices, splitSnackPrices});
        const drinkPricing = drink_quantities.reduce(function(r,a,i){return r+a*splitDrinkPrices[i]},0)
        const snackPricing = snack_quantities.reduce(function(r,a,i){return r+a*splitSnackPrices[i]},0)
        console.log({drinkPricing, snackPricing})
        const grandTotal = ((drinkPricing + snackPricing)*tax).toFixed(2);


        res.json({order, total, drinkNames, snackNames, 
            drinkPrices, snackPrices, splitDrinkNames,  splitSnackNames, splitDrinkPrices, splitSnackPrices, 
            drinkPricing, snackPricing, grandTotal
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.post('/', async (req, res) => {
    const { first_name, drinks, snacks } = req.body;
    try {
        const id = uuid_v4();
        const newOrder = { id, first_name };
        await post_order(newOrder);

        for await (const drink of drinks) {
                const drinksOrder = {  order_id: id, drink_id: drink.drink_id, dr_quantity: drink.dr_quantity};
                await post_drinksorder(drinksOrder);
                console.log({drinksOrder});
        }
        for await (const snack of snacks){
                const snacksOrder = { order_id: id, snack_id: snack.snack_id, sn_quantity: snack.sn_quantity };
                await post_snacksorder(snacksOrder);
                console.log({snacksOrder});
        }
        
        res.json({ message: "Order created!", id, drinks, snacks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    const { first_name, drink_ids, snack_ids, dr_quantity, sn_quantity } = req.body;
    try {
        const editOrder = { id, first_name };
        await edit_order(editOrder , id);

        for await (const drink_id of drink_ids) {
            const drinksOrder = { drink_id, order_id: id, dr_quantity };
            await post_drinksorder(drinksOrder);
        }
        for await (const snack_id of snack_ids){
            const snacksOrder = { snack_id, order_id: id, sn_quantity };
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