"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnStart = void 0;
const GameState_1 = require("../../GameState");
const GameOver_1 = require("../GameOver");
const PlayerTurn_1 = require("../PlayerTurn");
const Build_1 = require("./Build");
const DevCard_1 = require("./DevCard");
const Offer_1 = require("./trade/Offer");
class TurnStart extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.build = () => {
            this.core.setup();
            this.nextState = new Build_1.Build(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.play_dev_card = () => {
            this.core.setup();
            this.nextState = new DevCard_1.DevCard(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.offer = () => {
            this.core.setup();
            this.nextState = new Offer_1.Offer(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.next_turn = () => {
            this.nextState = new PlayerTurn_1.PlayerTurn(this.core, this.player_sz, (this.player_id + 1) % this.player_sz);
            return true;
        };
        this.end_game = () => {
            this.nextState = new GameOver_1.GameOver(this.core);
            return true;
        };
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "build": this.build,
            "play_dev_card": this.play_dev_card,
            "offer": this.offer,
            "next_turn": this.next_turn,
            "end_game": this.end_game,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("TurnStart:", this);
    }
}
exports.TurnStart = TurnStart;
