import { GameCore } from "../../../../core/GameCore";
import { CounterOffer } from "./CounterOffer";
import { TurnStart } from "../TurnStart";
import { PlayerTurnGameState } from "../../PlayerTurn";
import { PlayerId } from "../../../../common/GameTypes";

export class NewOffer extends PlayerTurnGameState {
    private offer = (): boolean => {
        this.nextState = new CounterOffer(this.core, this.player_id);
        return true;
    }

    private end_trade = (): boolean => {
        this.nextState = new TurnStart(this.core, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_id: PlayerId) {
        super(core, player_id);
        this.name = "new_offer";
        this.nextState = this;
        this.actions = {
            "offer": this.offer,
            "end_trade": this.end_trade,
        };
        console.log("NewOffer:", this);
    }
}
