const db = require('../models');

exports.getUser = ctx => {
    let id = ctx.params.id;

    if (typeof id === 'undefined') {
        // get current user id
        id = 1;
    }

    const data = {
        name: 'Vasya',
        message: `You have got ${id} User!`
    };

    ctx.body = data;
};

exports.getMe = ctx => {
    if (ctx.isUnauthenticated()) {
        ctx.status = 401;
        ctx.body = { message: 'Unauthenticated' };
        return;
    }
    ctx.status = 200;
    ctx.body = ctx.state.user;
};

exports.createUser = async ctx => {
    const body = ctx.request.body;
    const user = await db.User.create({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
    });

    ctx.login(user, (err) => {
        if (err) {
            ctx.status = 401;
            ctx.body = { message: err.message };
            return;
        }
        ctx.status = 200;
        ctx.body = user;
    });

    ctx.body = user;
};