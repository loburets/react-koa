const UserRepository = require('./users');

class Router {
    static route (method, url, response, bodyData) {
        let userRepository = new UserRepository();

        response.statusCode = 200;

        if (method === 'GET' && url === '/users/') {
            response.end(JSON.stringify(userRepository.users));
            return;
        }

        if (method === 'POST' && url === '/users/') {
            let user = userRepository.addUser(bodyData);
            response.end(JSON.stringify(user));
            return;
        }

        response.statusCode = 404;
    }
}

module.exports = Router;