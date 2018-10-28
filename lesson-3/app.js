const http = require('http');
const port = process.env.PORT || 8000;
const host = '127.0.0.1';

const requestHandler = (request, response) => {
    console.log(request.url);
    response.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

server.listen(port, host, (err) => {
    if (err) {
        return console.log('Server listening is failed', err);
    }
    console.log(`Server is running on ${host}:${port}`);
});