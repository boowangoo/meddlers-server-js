import { GameCore } from "../../core/GameCore";
import { GameState } from "../GameState";
import { FirstRound } from "./FirstRound";

export class Setup extends GameState {
    private start_game = (): boolean => {
        this.nextState = new FirstRound(this.core);
        return true;
    }

    private login = (): boolean => {
        this.core.login();
        if (this.core.game_full())
            return this.start_game();
        return true;
    }

    private logout = (): boolean => {
        this.core.logout();
        return true;
    }

    constructor(core: GameCore) {
        super(core);
        this.core.setup();
        this.name = "setup";
        this.nextState = this;

        this.actions = {
            "start_game": this.start_game,
            // non-state actions
            "login": this.login,
            "logout": this.logout,
        };
        console.log("Setup:", this);
    }
}
