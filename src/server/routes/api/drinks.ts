import * as express from 'express';
import { get_drinks, get_one_drink } from '../../db/queries/drinks';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const drinks = await get_drinks();
        res.json(drinks);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [drink] = await get_one_drink(Number(id));
        res.json(drink);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});

export default router;