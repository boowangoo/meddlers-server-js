import { GameCore } from "../../../../core/GameCore";
import { GameState, Action } from "../../../GameState";
import { TurnStart } from "../TurnStart";

export class PickCards extends GameState {
    private player_sz: number;
    private player_id: number;

    private end_robber: Action = () => {
        super.newState = new TurnStart(super.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "pick_cards";
        super.newState = this;
        super.actions = {
            "end_robber": this.end_robber,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
