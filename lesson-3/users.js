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
}

module.exports = UserRepository;