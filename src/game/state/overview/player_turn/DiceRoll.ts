import { PlayerId } from "../../../common/GameTypes";
import { GameCore } from "../../../core/GameCore";
import { PlayerTurnGameState } from "../PlayerTurn";
import { Robber } from "./Robber";
import { TurnStart } from "./TurnStart";

export class DiceRoll extends PlayerTurnGameState {
    private roll = (): boolean => {
        const diceRoll = this.core.dice_roll();
        if (diceRoll === 7) {
            this.nextState = new Robber(this.core, this.player_id);
        } else {
            this.nextState = new TurnStart(this.core, this.player_id);
        }
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "dice_roll";
        this.nextState = this;
        this.actions = {
            "roll": this.roll,
        };
        console.log("DiceRoll:", this);
    }
}
