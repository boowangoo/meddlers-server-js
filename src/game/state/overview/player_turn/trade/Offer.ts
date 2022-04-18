import { PlayerId } from "../../../../common/GameTypes";
import { GameCore } from "../../../../core/GameCore";
import { PlayerTurnGameState } from "../../PlayerTurn";
import { Trade } from "../Trade";

export class Offer extends PlayerTurnGameState {
    private trade = (): boolean => {
        this.nextState = new Trade(this.core, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "offer";
        this.nextState = this;
        this.actions = {
            "trade": this.trade,
        };
        console.log("Offer:", this);
    }
}
