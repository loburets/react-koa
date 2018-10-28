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
}

module.exports = UserRepository;