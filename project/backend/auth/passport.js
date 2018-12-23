const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const db = require('../models');
const bcrypt = require('bcrypt');
const showFieldsByUser = require('./show-fields-by-user');

const options = {
    usernameField: 'email',
    passwordField: 'password'
};

passport.use('local', new LocalStrategy(options, async (email, password, done) => {
    if (!email || !password) {
        return done(null, false);
    }

    let user, match;

    try {
        user = await db.User.findOne({where: {email}});
    } catch (e) {
        return done(null, false);
    }

    if (!user) {
        return done(null, false);
    }

    try {
        match = await bcrypt.compare(password, user.password);
    } catch (e) {
        return done(null, false);
    }

    if (!match) {
        return done(null, false);
    }

    return done(null, showFieldsByUser(user));
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
    let user;

    try {
        user = await db.User.findById(userId);
    } catch (e) {
        //
    }

    done(null, showFieldsByUser(user));
});

module.exports = passport;