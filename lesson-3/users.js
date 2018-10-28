class UserRepository {
    constructor () {
       this.users = require('./users.json')
    }
}

module.exports = UserRepository;