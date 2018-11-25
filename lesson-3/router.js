const UserRepository = require('./users');
let userRepository = new UserRepository();

class Router {
    static route (method, url, response, bodyData) {
        let urlParts = url.match(/^\/users\/([0-9]+)$/);
        let userId = urlParts ? urlParts[1] : null;
        response.statusCode = 200;

        if (userId && !userRepository.find(userId)) {
            response.statusCode = 404;
            response.end('User not found');

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
            response.statusCode = 204;
            response.end(JSON.stringify(userRepository.remove(userId)));
            return;
        }

        if (method === 'GET' && url === '/users/') {
            response.end(JSON.stringify(userRepository.users));
            return;
        }

        if (method === 'POST' && url === '/users/') {
            let user = userRepository.addUser(bodyData);
            response.statusCode = 201;
            response.end(JSON.stringify(user));
            return;
        }

        response.statusCode = 404;
        response.end();
    }
}

module.exports = Router;