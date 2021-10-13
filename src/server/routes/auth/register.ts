import * as express from 'express';
import { insert_user } from '../../db/queries/users';
import { generateHash } from '../../utils/passwords';
import { v4 as uuid_v4 } from 'uuid';
import { createToken } from '../../hooks/createToken';

const router = express.Router();

router.post('/', async (req, res) => {
    const { full_name, email, password } = req.body;
    try {
        const id = uuid_v4();
        const hashed = generateHash(password);
        const newUser = {id, full_name, email, password: hashed};
        const register = await insert_user(newUser);
        console.log(register);
        createToken(id, email, 'guest', res);
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.sqlMessage });
    }
});

export default router;