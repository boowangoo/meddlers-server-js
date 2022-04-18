"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = void 0;
const GameState_1 = require("../GameState");
const FirstRound_1 = require("./FirstRound");
class Setup extends GameState_1.GameState {
    constructor(core) {
        super(core);
        this.start_game = () => {
            this.core.setup();
            this.nextState = new FirstRound_1.FirstRound(this.core);
            return true;
        };
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "start_game": this.start_game,
        };
        console.log("Setup:", this);
    }
}
exports.Setup = Setup;
