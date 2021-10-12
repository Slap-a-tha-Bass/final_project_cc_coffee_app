import * as passport from 'passport';
import * as PassportJWT from 'passport-jwt';
import * as PassportLocal from 'passport-local';
import { Application } from 'express';
import { compareHash } from '../utils/passwords';
import { jwtConfig } from '../config';
import { Users } from '../../../types';
// import { find_user } from '../db/queries/users';

export const configurePassport = (app: Application) => {

    passport.serializeUser((user: Users , done) => {
        user.password ? delete user.password : null;
        done(null, user);
    });
    passport.deserializeUser((user, done) => done(null, user));

    passport.use(new PassportLocal.Strategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            // const [userFound] = await find_user('email', email);
            // if (!userFound || !compareHash(password, userFound.password)) {
            //     done(null, false);
            // } else {
            //     done(null, userFound);
            // }
        } catch (error) {
            done(error);
        }
    }));

    passport.use(new PassportJWT.Strategy({
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConfig.secret
    }, (payload, done) => {
        try {
            done(null, payload);
        } catch (error) {
            done(error);
        }
    }));
    app.use(passport.initialize());
};