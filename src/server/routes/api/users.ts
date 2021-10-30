import * as express from 'express';
import * as passport from 'passport';
import { ReqUsers } from '../../../../types';

const router = express.Router();

router.get('/', async (req: ReqUsers, res) => {
    try {
        res.json(`Welcome back, ${req.user.email}.
        Let's make some coffee!`);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.sqlMessage });
    }
});

export default router;