"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
class GameState {
    constructor(core) {
        this.next_state = () => this.nextState;
        this.name = "";
        this.core = core;
        this.nextState = this;
        this.actions = {};
    }
}
exports.GameState = GameState;
