"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewOffer = void 0;
const GameState_1 = require("../../../GameState");
const CounterOffer_1 = require("./CounterOffer");
const TurnStart_1 = require("../TurnStart");
class NewOffer extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.offer = () => {
            this.nextState = new CounterOffer_1.CounterOffer(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.end_trade = () => {
            this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "new_offer";
        this.nextState = this;
        this.actions = {
            "offer": this.offer,
            "end_trade": this.end_trade,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("NewOffer:", this);
    }
}
exports.NewOffer = NewOffer;
