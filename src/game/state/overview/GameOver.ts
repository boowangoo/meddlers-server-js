import { GameCore } from "../../core/GameCore";
import { GameState, Action } from "../GameState";
import { Setup } from "./Setup";

export class GameOver extends GameState {
    private clear_board: Action = () => {
        super.newState = new Setup(super.core);
        return true;
    }

    constructor(core: GameCore) {
        super(core);
        super.name = "setup";
        super.actions = {
            "clear_board": this.clear_board,
        };
    }
}
