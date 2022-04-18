"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevCard = void 0;
const GameState_1 = require("../../GameState");
const TurnStart_1 = require("./TurnStart");
const Robber_1 = require("./Robber");
const Build_1 = require("./Build");
class DevCard extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.play_dev_card = (action) => {
            switch (action) {
                case "knight":
                    this.nextState = new Robber_1.Robber(this.core, this.player_sz, this.player_id);
                    break;
                case "road_building":
                    this.nextState = new Build_1.Build(this.core, this.player_sz, this.player_id);
                    break;
                case "victory_point":
                    this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
                    break;
                case "monopoly":
                    this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
                    break;
                case "year_of_plenty":
                    this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
                    break;
                default:
                    this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
                    break;
            }
            return true;
        };
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "knight": () => this.play_dev_card("knight"),
            "victory_point": () => this.play_dev_card("victory_point"),
            "monopoly": () => this.play_dev_card("monopoly"),
            "year_of_plenty": () => this.play_dev_card("year_of_plenty"),
            "road_building": () => this.play_dev_card("road_building"),
            "cancel": () => this.play_dev_card("cancel"),
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("DevCard:", this);
    }
}
exports.DevCard = DevCard;
