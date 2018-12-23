const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
const db = require('../models');
const bcrypt = require('bcrypt');

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

    return done(null, {
        email,
        id: user.id
    });
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

    done(null, {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
    });
});

module.exports = passport;