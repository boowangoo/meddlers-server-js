import { GameCore } from "../../../../core/GameCore";
import { GameState, Action } from "../../../GameState";
import { Rob } from "./Rob";

export class RobberStart extends GameState {
    private player_sz: number;
    private player_id: number;

    private move: Action = () => {
        super.newState = new Rob(super.core, this.player_sz, this.player_id);
        return true;
    }

    constructor(core: GameCore, player_sz: number, player_id: number) {
        super(core);
        super.name = "robber_start";
        super.newState = this;
        super.actions = {
            "move": this.move,
        };

        this.player_sz = player_sz;
        this.player_id = player_id;
    }
}
