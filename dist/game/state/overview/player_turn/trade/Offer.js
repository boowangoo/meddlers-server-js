"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const GameState_1 = require("../../../GameState");
const Trade_1 = require("../Trade");
class Offer extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.trade = () => {
            this.nextState = new Trade_1.Trade(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "offer";
        this.nextState = this;
        this.actions = {
            "trade": this.trade,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("Offer:", this);
    }
}
exports.Offer = Offer;
