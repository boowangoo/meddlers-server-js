"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOver = void 0;
const GameState_1 = require("../GameState");
const Setup_1 = require("./Setup");
class GameOver extends GameState_1.GameState {
    constructor(core) {
        super(core);
        this.clear_board = () => {
            this.nextState = new Setup_1.Setup(this.core);
            return true;
        };
        this.name = "setup";
        this.actions = {
            "clear_board": this.clear_board,
        };
        console.log("GameOver:", this);
    }
}
exports.GameOver = GameOver;
