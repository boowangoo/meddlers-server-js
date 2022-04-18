import { PlayerId } from "../../../../common/GameTypes";
import { GameCore } from "../../../../core/GameCore";
import { GameState } from "../../../GameState";
import { PlayerTurnGameState } from "../../PlayerTurn";
import { TurnStart } from "../TurnStart";

export class PickCards extends PlayerTurnGameState {
    private end_robber = (): boolean => {
        this.nextState = new TurnStart(this.core, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "pick_cards";
        this.nextState = this;
        this.actions = {
            "end_robber": this.end_robber,
        };
        console.log("PickCards:", this);
    }
}
