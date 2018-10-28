const UserRepository = require('./users');
let userRepository = new UserRepository();

class Router {
    static route (method, url, response, bodyData) {
        let urlParts = url.match(/^\/users\/(\d+)/);
        let userId = urlParts ? urlParts[1] : null;
        response.statusCode = 200;

        if (method === 'GET' && userId) {
            response.end(JSON.stringify(userRepository.find(userId)));
            return;
        }

        if (method === 'PUT' && userId) {
            response.end(JSON.stringify(userRepository.update(userId, bodyData)));
            return;
        }

        if (method === 'DELETE' && userId) {
            response.end(JSON.stringify(userRepository.remove(userId)));
            return;
        }

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