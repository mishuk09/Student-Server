var http = require("http");
http
    .createServer(function (req, res) {
        if (req.url == '/abc') {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Hello HTTP");
        }
    })
    .listen(8081)

console.log("Server is running: http://127.0.0.1:8081/");