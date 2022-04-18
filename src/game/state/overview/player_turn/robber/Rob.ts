import { PlayerId } from "../../../../common/GameTypes";
import { GameCore } from "../../../../core/GameCore";
import { PlayerTurnGameState } from "../../PlayerTurn";
import { PickCards } from "./PickCards";

export class Rob extends PlayerTurnGameState {
    private rob_player = (): boolean => {
        this.nextState = new PickCards(this.core, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: PlayerId) {
        super(core, player_id);
        this.name = "rob";
        this.nextState = this;
        this.actions = {
            "rob_player": this.rob_player,
        };
        console.log("Rob:", this);
    }
}
