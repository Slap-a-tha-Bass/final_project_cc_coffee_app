import * as express from 'express';
import { delete_receipt, get_receipts, post_receipt } from '../../db/queries/receipts';
const router = express.Router();


router.post('/', async (req, res) => {
    const { receiptURL, amount, fullName } = req.body;
    const newReceipt = { receiptURL, amount, fullName }
    try {
        const postReceipt = await post_receipt(newReceipt);
        res.json(postReceipt);
    } catch (error) {
        res.status(500).json({ message: "Error posting receipt", error});
    }
});
router.get('/', async (req, res) => {
    try {
        const allReceipts = await get_receipts();
        res.json(allReceipts);
    } catch (error) {
        res.status(500).json({ message: "Error getting receipts", error});
    }
});
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await delete_receipt(Number(id));
        res.json({ message: "Receipt deleted"})
    } catch (error) {
        res.status(500).json({ message: "Error deleting receipts", error});
    }
})

export default router;