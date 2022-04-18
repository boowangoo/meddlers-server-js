import { Session } from "inspector";
import { SessionId } from "../common/GameTypes";
import { IActionMsg } from "../common/Messages";
import { GameCore } from "../core/GameCore";
import { GameState } from "./GameState";
import { StartGame } from "./StartGame"

export class StateMachine {
    private currState: GameState | undefined;

    next_state = (): void => {
        this.currState = this.currState?.next_state();
    }

    action = (action: IActionMsg, core: GameCore): boolean => {
        if (!this.currState) {
            this.currState = new StartGame(core);
        }
        if (!action || !action.name) {
            return false;
        }
        const acn = this.currState.actions[action.name];
        // return action.args ? acn(action.args) : acn([]);
        return acn(action.args);
    }
}
