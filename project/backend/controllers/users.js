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

    return ctx.body = data;
};

exports.createUser = ctx => {

    const data = {
        name: 'Vasya',
        message: `You have created new User!`
    };

    return ctx.body = data;
};