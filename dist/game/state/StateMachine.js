"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
const GameCore_1 = require("../core/GameCore");
const StartGame_1 = require("./StartGame");
class StateMachine {
    constructor() {
        this.next_state = () => {
            this.currState = this.currState.next_state();
            return this.currState;
        };
        this.action = (action) => { var _a; return (_a = this.currState.actions[action]()) !== null && _a !== void 0 ? _a : false; };
        this.core = new GameCore_1.GameCore();
        this.currState = new StartGame_1.StartGame(this.core);
    }
}
exports.StateMachine = StateMachine;
