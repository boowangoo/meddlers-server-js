import { GameCore } from "../../core/GameCore";
import { GameState, IGameState, Action } from "../GameState";
import { PlayerTurn } from "./PlayerTurn";

export class FirstRound extends GameState {
    private next_round: Action = () => {
        // super.core.setup();
        super.newState = new PlayerTurn(super.core, 4, 0);
        return true;
    }

    constructor(core: GameCore) {
        super(core);
        super.name = "setup";
        super.newState = this;
        super.actions = {
            "next_round": this.next_round,
        };
    }
}
