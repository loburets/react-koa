const UserRepository = require('./users');
let userRepository = new UserRepository();

class Router {
    static route (method, url, response, bodyData) {
        let urlParts = url.match(/^\/users\/(\d+)/);
        let userId = urlParts ? urlParts[1] : null;
        response.statusCode = 200;

        if (userId && !userRepository.find(userId)) {
            response.end('User not found');
            response.statusCode = 404;
            return;
        }

        if (method === 'GET' && userId) {
            response.end(JSON.stringify(userRepository.find(userId)));
            return;
        }

        if (method === 'PUT' && userId) {
            let result = userRepository.update(userId, bodyData);
            if (typeof result !== 'object') {
                response.statusCode = 422;
            }
            response.end(JSON.stringify(result));
            return;
        }

        if (method === 'DELETE' && userId) {
            response.end(JSON.stringify(userRepository.remove(userId)));
            response.statusCode = 204;
            return;
        }

        if (method === 'GET' && url === '/users/') {
            response.end(JSON.stringify(userRepository.users));
            return;
        }

        if (method === 'POST' && url === '/users/') {
            let user = userRepository.addUser(bodyData);
            response.end(JSON.stringify(user));
            response.statusCode = 201;
            return;
        }

        response.statusCode = 404;
    }
}

module.exports = Router;