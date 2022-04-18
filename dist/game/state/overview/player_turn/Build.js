"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Build = void 0;
const GameState_1 = require("../../GameState");
const TurnStart_1 = require("./TurnStart");
class Build extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.built = (build) => {
            switch (build) {
                case "road":
                    this.core.setup();
                    break;
                case "town":
                    this.core.setup();
                    break;
                case "city":
                    this.core.setup();
                    break;
                default:
                    break;
            }
            this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
            return true;
        };
        this.name = "setup";
        this.nextState = this;
        this.actions = {
            "built_road": () => this.built("road"),
            "built_town": () => this.built("town"),
            "built_city": () => this.built("city"),
            "cancel": () => this.built("cancel"),
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("Build:", this);
    }
}
exports.Build = Build;
