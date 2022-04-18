"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickCards = void 0;
const GameState_1 = require("../../../GameState");
const TurnStart_1 = require("../TurnStart");
class PickCards extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.end_robber = () => {
            this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "pick_cards";
        this.nextState = this;
        this.actions = {
            "end_robber": this.end_robber,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("PickCards:", this);
    }
}
exports.PickCards = PickCards;
