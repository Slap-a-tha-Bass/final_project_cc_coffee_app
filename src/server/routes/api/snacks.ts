import * as express from 'express';
import { get_snacks, get_one_snack } from '../../db/queries/snacks';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const snacks = await get_snacks();
        res.json(snacks);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [snack] = await get_one_snack(Number(id));
        res.json(snack);
    } catch (error) {
        res.status(500).json({ message: "Error in server route", error: error.sqlMessage });
    }
});

export default router;