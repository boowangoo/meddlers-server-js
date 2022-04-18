import { GameCore } from "../../core/GameCore";
import { GameState } from "../GameState";
import { Setup } from "./Setup";

export class GameOver extends GameState {
    private clear_board = (): boolean => {
        this.nextState = new Setup(this.core);
        return true;
    }

    constructor(core: GameCore) {
        super(core);
        this.name = "setup";
        this.actions = {
            "clear_board": this.clear_board,
        };
        console.log("GameOver:", this);
    }
}
