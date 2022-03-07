const http = require("http");
const static = require("node-static");
const file = new static.Server("./");
const server = http.createServer((req, res) => {
    req.addListener("end", () => {
        file.serve(req, res);
    }).resume();
});
const port = 3425;
const ip = "localhost"

server.listen(port, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});

server.on("upgrade", (req, socket) => {
    // Make sure that we only handle WebSocket upgrade requests
    if (req.headers["upgrade"] !== "websocket") {
        socket.end("HTTP/1.1 400 Bad Request");
        return;
    }
});