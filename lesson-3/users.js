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
            if (field === id) {
                continue;
            }

            if (!user.hasOwnProperty(field)) {
                return `Wrong property name ${field}`;
            }

            user[field] = data[field];
        }

        return user;
    }

    remove (id) {
        this.users = this.users.filter(function (user) {
            return Number(user.id) !== Number(id);
        });

        return 'User is deleted';
    }
}

module.exports = UserRepository;