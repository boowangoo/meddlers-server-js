import { PlayerId } from "../../../../common/GameTypes";
import { GameCore } from "../../../../core/GameCore";
import { PlayerTurnGameState } from "../../PlayerTurn";
import { Rob } from "./Rob";

export class RobberStart extends PlayerTurnGameState {
    private move = (): boolean => {
        this.nextState = new Rob(this.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "robber_start";
        this.nextState = this;
        this.actions = {
            "move": this.move,
        };
        console.log("RobberStart:", this);
    }
}
