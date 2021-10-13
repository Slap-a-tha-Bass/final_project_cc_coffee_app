import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';

export const createToken = (userid: string, email: string, role: string, res?: any) => {
    const token = jwt.sign({ userid, email, role},
        jwtConfig.secret,
        {expiresIn: jwtConfig.expires});
        res.json(token);
        return;
}