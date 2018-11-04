exports.getUser = ctx => {
    const data = {
        name: 'Vasya',
        message: 'You have got your User!'
    };

    return ctx.body = data;
};