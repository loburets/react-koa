const passport = require('koa-passport');
const LocalStrategy = require('passport-local');

const options = {
  usernameField: 'email',
  passwordField: 'password'
};

passport.use('local', new LocalStrategy(options, (email, password, done) => {
  // todo Fetch real user data from db and check if passed credentials match
  if (email && password) {
    return done(null, {
      email,
      password,
      id: 1
    });
  }

  return done(null, false);
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