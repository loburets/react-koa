class UserRepository {
    constructor () {
       this.users = require('./users.json');
       this.userAutoIncrement = this.users.length + 1;
    }

    addUser (user) {
        user.id = this.userAutoIncrement++;
        this.users.push(user);
        return user;
    }

    find (id) {
       for (let i in this.users) {
            if (Number(this.users[i].id) === Number(id)) {
                return this.users[i];
            }
        }

        return null;
    }

    update (id, data) {
        let user = this.find(id);

        if (!user) {
            return null;
        }

        for (let field in data) {
            if (!user.hasOwnProperty(field)) {
                return `Wrong property name ${field}`;
            }

            user[field] = data[field];
        }

        return user;
    }
}

module.exports = UserRepository;