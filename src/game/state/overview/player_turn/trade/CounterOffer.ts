import { GameCore } from "../../../../core/GameCore";
import { GameState, Action } from "../../../GameState";
import { NewOffer } from "./NewOffer";
import { TurnStart } from "../TurnStart";

export class CounterOffer extends GameState {
    private player_sz: number;
    private player_id: number;

    private offer: Action = () => {
        super.newState = new NewOffer(super.core, this.player_sz, this.player_id);
        return true;
    }

    private end_trade: Action = () => {
        super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "counter_offer";
        super.newState = this;
        super.actions = {
            "offer": this.offer,
            "end_trade": this.end_trade,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
