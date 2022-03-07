import { GameCore } from "../../../../core/GameCore";
import { GameState, Action } from "../../../GameState";
import { Trade } from "../Trade";



export class Offer extends GameState {
    private player_sz: number;
    private player_id: number;

    private trade: Action = () => {
        super.newState = new Trade(super.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "offer";
        super.newState = this;
        super.actions = {
            "trade": this.trade,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
