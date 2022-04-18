import express, {Application, Request, Response, NextFunction} from "express";
import http, {createServer} from "http";
import {Server, Socket} from "socket.io";
import path from "path";
import { StateMachine } from "./game/state/StateMachine";
import { SessionId } from "./game/common/GameTypes";
import { GameCore } from "./game/core/GameCore";
import { IActionMsg } from "./game/common/Messages";

const app: Application = express();
const httpServer: http.Server = createServer(app);
const io = new Server(httpServer, {});

const core: GameCore = new GameCore();
const stateMachine: StateMachine = new StateMachine();
const clients: SessionId[] = [];

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

io.on("connection", (socket: Socket) => {
    console.log("connected!");
    console.log("socket:", socket.id);

    if (clients.find(id => id === socket.id) === undefined) {
        clients.push(socket.id);
    }

    socket.on('chat message', (msg: string) => {
        const msgObj: IActionMsg = JSON.parse(msg);
        
        core.set_curr_session(socket.id);
        if (stateMachine.action(msgObj, core)) {
            stateMachine.next_state();
        }
        io.emit('chat message', msg);

        for (const [id, msgs] of Object.entries(core.pop_private_responses())) {
            for (const msg of msgs) {
                io.to(id).emit(msg);
            }
        }
        for (const msg of core.pop_public_responses()) {
            io.emit(msg);
        }
    });
});

httpServer.listen(3000, () => console.log("server running"));
