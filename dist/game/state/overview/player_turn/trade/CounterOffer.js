"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterOffer = void 0;
const GameState_1 = require("../../../GameState");
const NewOffer_1 = require("./NewOffer");
const TurnStart_1 = require("../TurnStart");
class CounterOffer extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.offer = () => {
            this.nextState = new NewOffer_1.NewOffer(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.end_trade = () => {
            this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "counter_offer";
        this.nextState = this;
        this.actions = {
            "offer": this.offer,
            "end_trade": this.end_trade,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("CounterOffer:", this);
    }
}
exports.CounterOffer = CounterOffer;
