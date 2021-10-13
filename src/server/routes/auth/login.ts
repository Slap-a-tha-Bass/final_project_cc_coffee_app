import * as express from 'express';
import * as passport from 'passport';
import { ReqUsers } from '../../../../types';
import { createToken } from '../../hooks/createToken';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: ReqUsers, res) => {
    try {
        createToken(req.user.id, req.user.email, 'guest', res);
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.sqlMessage });
    }
});

export default router;