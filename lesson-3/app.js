const http = require('http');
const port = process.env.PORT || 8000;
const host = '127.0.0.1';
const Router = require('./router');

const requestHandler = (request, response) => {
    console.log(`${request.method} request to "${request.url}"`);

    let rawBodyData = '';
    request.on('data', (chunk) => { rawBodyData += chunk; });
    request.on('end', () => {
        let bodyData = null;
        if (rawBodyData.length > 0) {
            try {
                bodyData = JSON.parse(rawBodyData);
            } catch (e) {
                response.end('wrong Json');
                return
            }
        }

        response.setHeader('Content-Type', 'application/json');
        Router.route(request.method, request.url, response, bodyData);

        if (!response.finished) {
            response.end();
        }
    });
};

const server = http.createServer(requestHandler);

server.listen(port, host, (err) => {
    if (err) {
        return console.log('Server listening is failed', err);
    }
    console.log(`Server is running on ${host}:${port}`);
});