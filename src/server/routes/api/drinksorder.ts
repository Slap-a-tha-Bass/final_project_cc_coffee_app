import * as express from 'express';
import {get_drinksorder, get_one_drinksorder } from '../../db/queries/drinksorder';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const drinksOrder = await get_drinksorder();
        res.json(drinksOrder);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const drinkOrder = await get_one_drinksorder(id);
        res.json(drinkOrder);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});

export default router;