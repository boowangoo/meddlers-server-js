import { GameCore } from "../../../core/GameCore";
import { GameState, Action } from "../../GameState";
import { TurnStart } from "./TurnStart";

export class DiceRoll extends GameState {
    private player_sz: number;
    private player_id: number;

    private roll: Action = () => {
        const diceRoll = super.core.dice_roll();
        if (diceRoll === 7) {
            super.newState;
        } else {
            super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
        }
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "dice_roll";
        super.newState = this;
        super.actions = {
            "roll": this.roll,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
