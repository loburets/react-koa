const UserRepository = require('./users');

class Router {
    static route (method, url, response) {
        let userRepository = new UserRepository();

        if (method === 'GET' && url === '/users/') {
            response.statusCode = 200;
            response.end(JSON.stringify(userRepository.users));
        }
    }
}

module.exports = Router;