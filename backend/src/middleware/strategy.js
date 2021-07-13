import passport from 'passport';
import JWT from 'jsonwebtoken';
import config from '../config';

export var jwtStrategy = async (req, res, next) => {
    return await passport.authenticate('user-jwt', {session: false}, (err, user, info) => { 
        let contype = req.headers['content-type'];
        console.log('useruseruseruseruseruser', user)
        var json = !(!contype || contype.indexOf('application/json') !== 0);
        console.log('jsonjson', json)
        console.log('errerrerr', err)
        if (err && err == 'expired'){ return json?res.status(500).json({ errors: ['Session is expired']}):res.redirect('/auth/login'); }
        if (err && err == 'invalid'){ return json?res.status(500).json({ errors: ['Invalid token recieved']}):res.redirect('/logout'); }
        if (err && err == 'user'){ return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
        if (err && Object.keys(err).length) { return res.status(500).json({ errors: [ err ]}); }
        if (err) { return res.status(500).json({ errors: [ 'Invalid user recieved' ]}); }
        if (!user) { return json?res.status(500).json({ errors: ['Invalid user recieved']}):res.redirect('/logout'); }
        req.user = user;
        next();
    })(req, res, next);
};

export var localStrategy = async (req, res, next) => {
    return await passport.authenticate('user-local', {session: false}, (err, user, info) => {
        console.log('user logins: ', user)
        if (err && err == 'invalid') { return res.status(500).json({ errors: ['Email Id not verified']}); }
        if (err && err == 'attempt') { return res.status(500).json({ errors: ['Too many invalid attempts. Please reset your password.']}); }
        if (err && err.startsWith('attempt:')) { return res.status(500).json({ errors: ['Invalid Credentials (' + err.split(':')[1]+' Attempt(s) Left)']}); }
        if (err) { return res.status(500).json({ errors: [ err ]}); }
        if (!user) { return res.status(500).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        next();
    })(req, res, next);
};

export var customerStrategy = (req, res, next) => {
    passport.authenticate('customer-local', {session: false}, (err, user, info) => {
        if (err && err == 'invalid') { return res.status(500).json({ errors: ['Email Id not verified']}); }
        if (err && err == 'attempt') { return res.status(500).json({ errors: ['Too many invalid attempts. Please reset your password.']}); }
        if (err && err.startsWith('attempt:')) { return res.status(500).json({ errors: ['Invalid Credentials (' + err.split(':')[1]+' Attempt(s) Left)']}); }
        if (err) { return res.status(500).json({ errors: [ err ]}); }
        if (!user) { return res.status(500).json({ errors: ['Invalid Credentials']}); }
        req.user = user;
        next();
    })(req, res, next);
};