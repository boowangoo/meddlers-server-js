"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rob = void 0;
const GameState_1 = require("../../../GameState");
const PickCards_1 = require("./PickCards");
class Rob extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.rob_player = () => {
            this.nextState = new PickCards_1.PickCards(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "rob";
        this.nextState = this;
        this.actions = {
            "rob_player": this.rob_player,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("Rob:", this);
    }
}
exports.Rob = Rob;
