const passport = require('../auth/passport');

exports.login = async ctx => {
    await passport.authenticate('local', {}, async (err, user) => {
        if (!user) {
            ctx.status = 401;
            ctx.body = { message: 'Incorrect login/password' };
            return;
        }

        ctx.login(user, (err) => {
            if (err) {
                ctx.status = 401;
                ctx.body = { message: err.message };
                return;
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
