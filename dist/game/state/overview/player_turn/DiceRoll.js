"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiceRoll = void 0;
const GameState_1 = require("../../GameState");
const TurnStart_1 = require("./TurnStart");
class DiceRoll extends GameState_1.GameState {
    constructor(core, player_sz, player_id) {
        super(core);
        this.roll = () => {
            const diceRoll = this.core.dice_roll();
            if (diceRoll === 7) {
                this.nextState;
            }
            else {
                this.nextState = new TurnStart_1.TurnStart(this.core, this.player_sz, this.player_id);
            }
            return true;
        };
        this.name = "dice_roll";
        this.nextState = this;
        this.actions = {
            "roll": this.roll,
        };
        this.player_sz = player_sz;
        this.player_id = player_id;
        console.log("DiceRoll:", this);
    }
}
exports.DiceRoll = DiceRoll;
