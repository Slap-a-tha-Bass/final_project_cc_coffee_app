import * as express from 'express';
import {get_snacksorder, get_one_snacksorder } from '../../db/queries/snacksorder';
import { get_one_order } from '../../db/queries/orders';
import { SnacksOrder } from '../../../../types';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const snacksOrder = await get_snacksorder();
        res.json(snacksOrder);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // await get_one_order(id);
        const [snackOrder] = await get_one_snacksorder(id);
        res.json(snackOrder);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});

export default router;