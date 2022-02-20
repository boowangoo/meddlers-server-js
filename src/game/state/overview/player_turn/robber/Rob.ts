import { GameCore } from "../../../../core/GameCore";
import { GameState, Action } from "../../../GameState";
import { PickCards } from "./PickCards";

export class Rob extends GameState {
    private player_sz: number;
    private player_id: number;

    private rob_player: Action = () => {
        super.newState = new PickCards(super.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "rob";
        super.newState = this;
        super.actions = {
            "rob_player": this.rob_player,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
