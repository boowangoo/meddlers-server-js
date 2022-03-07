import express, {Application, Request, Response, NextFunction} from "express";
import http, {createServer} from "http";
import {Server, Socket} from "socket.io";
import fs from "fs";
import path from "path";

const app: Application = express();
const httpServer: http.Server = createServer(app);
const io = new Server(httpServer, {});



app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

io.on("connection", (socket: Socket) => {
    console.log("connected!");

    socket.on('chat message', (msg: string) => {
        io.emit('chat message', msg);
    });
});

httpServer.listen(3000, () => console.log("server running"));
