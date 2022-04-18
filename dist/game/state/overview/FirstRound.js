"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstRound = void 0;
const GameState_1 = require("../GameState");
const PlayerTurn_1 = require("./PlayerTurn");
class FirstRound extends GameState_1.GameState {
    constructor(core) {
        super(core);
        this.next_round = () => {
            // this.core.setup();
            this.nextState = new PlayerTurn_1.PlayerTurn(this.core, 4, 0);
            return true;
        };
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "next_round": this.next_round,
        };
        console.log("FirstRound:", this);
    }
}
exports.FirstRound = FirstRound;
