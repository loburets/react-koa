const passport = require('../auth/passport');

exports.login = async ctx => {
    if (ctx.isAuthenticated()) {
        return ctx.status = 200;
    }

    await passport.authenticate('local', {}, async (err, user) => {
        if (!user) {
            ctx.throw(401, 'Incorrect login/password');
        }

        ctx.login(user, (err) => {
            if (err) {
                ctx.throw(401, err.message);
            }
            ctx.status = 200;
            ctx.body = user;
        });
    })(ctx);
};

exports.logout = async ctx => {
    await ctx.logout();
    return ctx.status = 200;
};
