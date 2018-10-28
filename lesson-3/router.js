const UserRepository = require('./users');

class Router {
    static route (method, url) {
        let userRepository = new UserRepository();
    }
}

module.exports = Router;