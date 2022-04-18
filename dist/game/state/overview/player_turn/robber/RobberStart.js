"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobberStart = void 0;
const GameState_1 = require("../../../GameState");
const Rob_1 = require("./Rob");
class RobberStart extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.move = () => {
            this.nextState = new Rob_1.Rob(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "robber_start";
        this.nextState = this;
        this.actions = {
            "move": this.move,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("RobberStart:", this);
    }
}
exports.RobberStart = RobberStart;
