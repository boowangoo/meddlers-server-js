"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {});
app.get("/", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, "/public/index.html"));
});
io.on("connection", (socket) => {
    console.log("connected!");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
httpServer.listen(3000, () => console.log("server running"));
