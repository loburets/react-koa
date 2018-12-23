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

passport.deserializeUser((userId, done) => {
    // todo Fetch real user data from db
    done(null, {
        email: 'test@example.com',
        password: 'password',
        id: 1
    });
});

module.exports = passport;