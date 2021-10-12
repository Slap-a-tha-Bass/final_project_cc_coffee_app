import * as express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    res.json('Templates ONLY');
});
router.get('/:id', async (req, res) => {
    res.json('Templates ONLY');
});
router.post('/', async (req, res) => {
    res.json('Templates ONLY');
});
router.put('/:id', async (req, res) => {
    res.json('Templates ONLY');
});
router.delete('/:id', async (req, res) => {
    res.json('Templates ONLY');
});

export default router;