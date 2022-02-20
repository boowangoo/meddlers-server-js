import { GameCore } from "../../core/GameCore";
import { GameState, Action } from "../GameState";
import { FirstRound } from "./FirstRound";

export class Setup extends GameState {
    private start_game: Action = () => {
        super.core.setup();
        super.newState = new FirstRound(super.core);
        return true;
    }

    constructor(core: GameCore) {
        super(core);
        super.name = "setup";
        super.newState = this;
        super.actions = {
            "start_game": this.start_game,
        };
    }
}
